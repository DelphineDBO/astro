---
Date première publication: 2026-07-23
tags:
  - AUTOMATISATIONS-N8N
reference: N8N-001
publish: true
---



![[wf-screenshot.png]]

Workflow n8n de traitement automatique des factures reçues par email. Déclenché tous les matins, il scanne un label Gmail dédié, sélectionne les emails reçus la veille, analyse chaque pièce jointe avec GPT-4.1-mini, extrait les informations de la facture, renomme et archive chaque pièce jointe sur Google Drive, transfère à Qonto par email et log l'entrée dans Supabase (optionnel).

## Architecture

```
Schedule Trigger (chaque jour)
  → Date & Time (calcule la date d'hier)
    → Gmail (scane le label FACTURES, télécharge les pièces jointes)
      → If (filtre : une PJ + pas en "SENT" + filename ≠ "Receipt")
          [NON] → No Operation
          [OUI] → Code (éclate multi-PJ → 1 item par fichier)
                    ├─ GDrive Upload file (GDrive, nom original)
                    └─ Switch (PDF ou image ?)
                         [PDF]   → Message a model  (GPT-4.1-mini, mode fichier)
                         [image] → Message a model1 (GPT-4.1-mini, mode image)
                                     → Edit Fields (7 variables, crée le nom du fichier)
                                       → Merge (GDrive id + nom du fichier généré par IA)
                                         → GDrive Update file (renommage du fichier )
                                           → GDrive Download file
                                             → GMail Send a message (email Qonto + PJ)
                                               → Create a row (Supabase)
```


## Fichier template .json

[Télécharger le blueprint](/astro/N8N-001/blueprint.json)


## Prérequis

- Compte n8n avec accès aux credentials suivants :
  - Gmail OAuth2
  - Google Drive OAuth2
  - OpenAI API
  - Supabase API
- Un label Gmail dédié pour les facture, où atterrissent les factures (via une règle Gmail par exemple) (ex. `FACTURES`)
- Un dossier Google Drive de réception
- Une adresse email de réception Qonto
- Une table Supabase `my-invoices` (par exemple, voir schéma ci-dessous)

## Variables à configurer

| Variable                   | Node                                    | Description                             |
| -------------------------- | --------------------------------------- | --------------------------------------- |
| `YOUR_GMAIL_LABEL_ID`      | Gmail                                   | ID du label Gmail (format `Label_XXXX`) |
| `YOUR_GDRIVE_FOLDER_ID`    | Upload file                             | ID du dossier GDrive de destination     |
| `YOUR_QONTO_INBOX_EMAIL`   | Send a message                          | Email de réception Qonto                |
| `YOUR_SUPABASE_TABLE`      | Create a row                            | Nom de la table Supabase                |
| `YOUR_GMAIL_CREDENTIAL`    | Gmail, Send a message                   | Credential Gmail OAuth2                 |
| `YOUR_GDRIVE_CREDENTIAL`   | Upload file, Update file, Download file | Credential Google Drive OAuth2          |
| `YOUR_OPENAI_CREDENTIAL`   | Message a model, Message a model1       | Credential OpenAI                       |
| `YOUR_SUPABASE_CREDENTIAL` | Create a row                            | Credential Supabase                     |

## Filtre des emails (node If)

Le workflow filtre les emails selon 3 conditions combinées (AND) :
- L'email a au moins une pièce jointe (`$binary` non vide)
- L'email n'est pas dans les envoyés (`labelIds[1]` ≠ "SENT")
- Le nom du fichier ne contient pas "Receipt" (exclut les reçus, seul les factures sont traitées)



## Prompt utilisé pour GPT

```

Analyse cette note de frais ou cette facture et trouve les éléments demandés dans le format de sortie json.
```


## Schéma JSON — extraction des informations par l'IA

```json
{
  "date": "YYYY-MM-DD",
  "montant_ttc": 42.50,
  "fournisseur": "Amazon",
  "categorie": "fournitures",
  "description": "Achat clavier USB"
}
```

Catégories disponibles : `restaurant` · `transport` · `hotel` · `fournitures` · `autre`

## Convention de nommage des factures

Les fichiers sont renommés automatiquement après analyse IA :
```
YYYY-MM-DD-Fournisseur-MontantTTC.extension
```
Exemple : `2026-01-15-Amazon-42.5.pdf`




## Schéma Supabase — table `my-invoices`

| Colonne | Type | Source |
|---|---|---|
| `invoice_date` | date | IA |
| `invoice_ttc` | number | IA |
| `invoice_supplier` | text | IA |
| `invoice_description` | text | IA |
| `invoice_year` | text | IA (dérivé de date) |
| `invoice_filename` | text | `nom_fichier` |
| `invoice_origin` | text | `"email"` (fixe) |
