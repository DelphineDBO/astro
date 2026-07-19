---
Date première publication: 2024-10-27
Statut:
  - Done
Type:
  - ARTICLE
Publié dans:
  - NOTION PUBLISHING
URL: https://www.notion.so/dbo-consulting/Google-Workspace-D-l-guer-sa-boite-email-632266f76b4647c6930aec51fc1158a8?source=copy_link
publish: true
reference: GGWS-003
tags:
  - GOOGLE-WORKSPACE
---
*27 Octobre 2024*

***Delphine Bottarlini -** `delphine.bottarlini@gmail.com`*


**Prérequis**  : 

- Un compte administrateur sur Google Workspace
- Un compte Google Workspace que l’on veut déléguer (client@domaine.fr par exemple).
- Un compte Google Workspace, dans le même workspace (ne fonctionne pas avec une @gmail.com), à qui l’on veut déléguer (va@domaine.fr par exemple)


**Note** : pour des raisons de sécurité et de vie privée, les captures d’écran ont été anonymisées, ce qui peut conduire à des différences entre ce que vous voyez dans cette procédure et sur votre écran, et également à quelques incohérences dans le déroulement des captures d’écran


# 1- Activer l’option de délégation dans Google Workspace

Avec son compte administrateur du Google Workspace, aller sur la console d’administration sur admin.google.com.

Renseigner son mot de passe une deuxième fois.

Dans le menu de gauche, cliquer sur “Applications” -**> “**Google Workspace” -**> “**Gmail” :

![[GGWS-003_img.png]]

Dans le menu “Délégation de messagerie”, cliquer sur le crayon à droite : 

![[GGWS-003_img 1.png]]

Dans le sous-menu qui s’affiche, sélectionner les options comme ci-dessous, puis cliquer sur Enregistrer : 

![[GGWS-003_img 2.png]]

La configuration dans la console d’administration est terminée.

Il convient maintenant de configurer la délégation sur votre compte.

# 2- Configurer la délégation sur son compte

Revenir sur sa Gmail, “client@domaine.fr”

Cliquer sur la roue crantée en haut à droite puis “Voir tous les paramètres” : 

![[GGWS-003_img 3.png]]

Cliquer ensuite sur “Comptes”. Un menu “Déléguer l’accès à votre compte :” apparait. Si il n’est pas encore apparu, attendre 5 min et actualiser la page, le temps que le paramètre défini précédemment dans la console d’administration soit appliqué : 

![[GGWS-003_img 4.png]]

Dans ce menu, cliquer sur “Ajouter un autre compte”, un pop-up sur fond jaune apparait :

![[GGWS-003_img 5.png]]

Rentrer l’adresse email à qui vous voulez déléguer votre compte (va@domaine.fr) et cliquer sur “Etape suivante”:

![[GGWS-003_img 6.png]]

Il est demandé de valider l’opération, cliquer sur “Envoyer un e-mail pour déléguer l’accès”: 

![[GGWS-003_img 7.png]]

L’opération est validée, fermer le pop-up jaune : 

![[GGWS-003_img 8.png]]

L’adresse email renseignée va recevoir un email, avec un lien à l’intérieur, pour approuver la demande de délégation : 

![[GGWS-003_img 9.png]]

Une fois que la personne aura accepté la demande de délégation, elle verra dans sa liste de compte Google un nouveau compte avec un tag “Délégué”. En cliquant sur ce compte, un nouvel onglet s’ouvrira sur la boite mail de la personne qui a délégué le compte : 

![[GGWS-003_img 10.png]]

Pour la personne qui a délégué sa boite mail (client@domaine.fr), dans le menu des Paramètres, le compte délégué apparaitra.

Il ya également la possibilité de configurer deux options : 

- “Marquer comme Lu” “ Laisser les conversations marquées comme non lues si d’autres utilisateurs les ouvrent” :  permettant de garder les mails non lus, même si ils sont ouverts par la personne déléguée (va@domaine.fr)
- “Informations sur l’expéditeurs” “Afficher uniquement cette adresse ([client@domaine.fr](mailto:client@domaine.fr)) : pour que les mails envoyés depuis la boite mail client@domaine.fr mais écrits et envoyés par [va@domaine.fr](mailto:va@domaine.fr) soient toujours vu par le récepteur du mail comme envoyé par client@domaine.fr. Sinon, le mail sera vu comme “Envoyé par va@domaine.fr” par le récepteur du mail

![[GGWS-003_img 11.png]]