---
Date première publication: 2024-10-27
Statut:
  - Done
Type:
  - ARTICLE
Publié dans:
  - NOTION PUBLISHING
URL:
publish: true
reference: GGWS-006
tags:
  - GOOGLE-WORKSPACE
---

*27 Octobre 2024*

***Delphine Bottarlini -** `delphine.bottarlini@gmail.com`*


**Prérequis**  : 

- Un compte administrateur sur son hébergeur de nom de domaine (Hostinger, Ionos, OVH, etc.)
- Un compte administrateur sur Google Workspace


**Note** : pour des raisons de sécurité et de vie privée, les captures d’écran ont été anonymisées, ce qui peut conduire à des différences entre ce que vous voyez dans cette procédure et sur votre écran


# 1. Mettre en place le SPF

Chez votre hébergeur de nom de domaine (OVH par exemple), il faut ajouter un champs SPF avec les valeurs de Google (si ce n’est pas déjà fait).

La valeur du champs SPF sera la suivante : 

```jsx
"v=spf1 include:_spf.google.com ~all"
```

Si un TTL est obligatoire mettre 1 heure ou 3600 secondes.

Si le type de champs “SPF” n’est pas disponible, choisir un champs TXT.

Exemple sur OVH : 

![[Pasted image 20260221153031.png]]

Sources : 

- Google :
    - [https://support.google.com/a/answer/10684623](https://support.google.com/a/answer/10684623)
    - [https://support.google.com/a/answer/10683907](https://support.google.com/a/answer/10683907)

# 2. Mettre en place DKIM

## Générer une clef DKIM sur Google Workspace

Aller dans le menu Appplications - Google Workspace - Gmail

![[Pasted image 20260221153103.png]]

Dérouler le menu “Authentifier les e-mails” : 

![[Pasted image 20260221153116.png]]

Sélectionner le domaine puis cliquer sur “Générer un nouvel enregistrement” : 

![[Pasted image 20260221153123.png]]

Laisser les options par défaut et cliquer sur “Générer” : 

![[Pasted image 20260221153131.png]]

Une clef est alors générée : 

![[Pasted image 20260221153140.png]]

## Rajouter l’entrée DKIM sur le nom de domaine

Il convient maintenant de créer une nouvelle entrée DKIM sur le nom de domaine avec les informations fournies (ou un nouvelle entrée TXT si le type “DKIM” n’est pas disponible sur votre hébergeur de nom de domaine).

Exemple sur OVH : 

En ajoutant une entrée DKIM sur le domaine : 

- Copier la clef dans Public Key (ce qu’il ya après le “p=”)
- Cocher “Version”
- Cocher “Key Type”
- Laisser les autres paramètres par défaut

On voit tout en bas que l’entrée qui va être ajoutée correspond bien  à l’entrée préconisée par Google dans la console d’administration.

Faire “Suivant” puis “Confirmer”.

![[Pasted image 20260221153203.png]]

Exemple de l’entrée finale dans OVH : 

![[Pasted image 20260221153213.png]]

## Lancer l’authentification DKIM

Retourner dans la console d’administration Google et cliquer sur “Lancer l’authentification” : 

![[Pasted image 20260221153225.png]]

Ignorer le message suivant et lancer un test : 

![[Pasted image 20260221153232.png]]

## Tester

Tester en envoyant un mail depuis la boite mail vers une Gmail ou un autre utilisateur Google (cela ne fonctionne pas pour soi même).

Une fois le mail reçu, afficher la version originale du mail (Cliquer à côté de **Répondre** sur **Plus** **Afficher l'original).**

Rechercher dans la partie **Authentication-Results** la mention **DKIM=pass** ou **DKIM=OK :** 

![[Pasted image 20260221153251.png]]

Le DKIM est en place ! 

Sources : 

- Google : [https://support.google.com/a/answer/180504](https://support.google.com/a/answer/180504)
