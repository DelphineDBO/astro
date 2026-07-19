---
Date première publication: 2025-03-18
Statut:
  - Done
Type:
  - ARTICLE
Publié dans:
  - NOTION PUBLISHING
URL:
publish: true
reference: GGWS-002
tags:
  - GOOGLE-WORKSPACE
---
*18 Mars 2025*

***Delphine Bottarlini -** `delphine.bottarlini@gmail.com`*



**Prérequis**  : Un compte Google (@gmail.com ou Google Workspace)

**Note** : pour des raisons de sécurité et de vie privée, les captures d’écran ont été anonymisées, ce qui peut conduire à des différences entre ce que vous voyez dans cette procédure et sur votre écran, et également à quelques incohérences dans le déroulement des captures d’écran

## Principes de base des filtres Gmail

Les filtres Gmail vous permettent d'automatiser le traitement de vos emails selon des critères spécifiques. Vous pouvez filtrer par expéditeur, destinataire, objet, contenu, taille, ou présence de pièces jointes.

## Création d'un filtre avec plusieurs adresses email

### Utilisation du caractère "|" (OU logique)

Pour filtrer les emails provenant de plusieurs adresses, utilisez le caractère `|` comme séparateur :

```
contact@entreprise1.com|newsletter@entreprise2.com|support@entreprise3.com

```

Ce filtre capturera les emails provenant de n'importe laquelle de ces trois adresses.

### Gestion des adresses email composées avec "(" et ")"

Pour les adresses email qui contiennent des caractères spéciaux comme le signe "+" (souvent utilisé pour créer des alias), entourez-les de parenthèses :

```
contact@entreprise.com|(facture+stripe@stripe.com)

```

Sans les parenthèses, Gmail pourrait interpréter le "+" comme un caractère spécial de recherche plutôt que comme partie de l'adresse email.

## Étapes pour créer un filtre avancé

Cliquer sur la roue crantée dans Gmail, en haut à droite, puis sur “Voir tous les paramètres” : 

![[Pasted image 20260221145927.png]]

Puis cliquer sur le menu “Filtres et adresses bloquées” : 
![[Pasted image 20260221145937.png]]
Exemple : détail du filtre pour les factures : 

```jsx
(invoice+statements@sedomicilier.fr)|(invoice+statements@acasi.io)|(invoice+statements@acasi.io)
```
![[Pasted image 20260221145951.png]]
![[Pasted image 20260221150000.png]]