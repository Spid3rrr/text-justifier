## Text Justifier Service

Ce service génère des tokens pour des utilisateurs en les identifiant par leur email et justifie le texte donné en body.

J'ai noté mes suppositions à la fin de ce document.

## Contraintes

- La longueur des lignes du texte [justifié](<https://fr.wikipedia.org/wiki/Justification_(typographie)>) doit être de 80 caractères.
- L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain
- L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne un token d’une requête POST avec un json body {"email": "foo@bar.com"}.
- Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.
- Le code **doit être déployé** sur un url ou une ip public
- Le code doit être rendu sur Github (ou gitlab)
- Langage : Node.js → typescript
- **PAS** d’usage de bibliothèque externe pour la justification

## Exemples input / output

https://drive.google.com/drive/folders/1P8GFZBNVYM3KzE5TmJB1yLoecDBUqBc-

## Suppositions

J'ai supposé que :

- Les utilisateurs ont le droit de générer plusieurs tokens avec la même adresse email.
- La limite quotidienne de 80 000 mots est fixe. Sinon, on peut l'ajouter comme variable d'environnement (et de même pour la longueur de chaque ligne).

## Limitations

- Les tests effectués sont des tests d'intégration, pas des tests unitaires. J'ai préféré me concentrer sur la fonctionnalité principale.
- Il y'a plusieurs constantes dans le code qui devraient être des variables d'environnement.
