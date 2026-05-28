# Merdi & Bénédicte — Fat Loss Apps

Applications web PWA personnalisées de suivi de perte de graisse, synchronisées en temps réel via Firebase Firestore.

---

## Structure du dépôt

```
├── merdi_fat_loss_v3_responsive.html   # App Merdi (MK)
├── benedicte_fat_loss_v3_responsive.html # App Bénédicte (BM)
├── manifest_merdi.json                 # Manifest PWA Merdi
├── manifest_benedicte.json             # Manifest PWA Bénédicte
├── sw.js                               # Service Worker partagé
├── icon_merdi_192.png                  # Icône MK 192x192
├── icon_merdi_512.png                  # Icône MK 512x512
├── icon_benedicte_192.png              # Icône BM 192x192
├── icon_benedicte_512.png              # Icône BM 512x512
└── README.md
```

---

## Firebase

- **Projet** : `merdi-et-ben-apps`
- **Base de données** : Cloud Firestore
- **Documents** :
  - `apps/merdi` — données de Merdi
  - `apps/benedicte` — données de Bénédicte
  - `apps/shared_foods` — base alimentaire partagée
  - `apps/food_notifications` — notifications de changements alimentaires entre les deux apps
  - `apps/shared_challenge` — défi de la semaine partagé

---

## Fonctionnalités principales

- Suivi quotidien des macros (protéines, glucides, lipides, fibres)
- Calcul TDEE/BMR personnalisé (formule Mifflin-St Jeor)
- Base alimentaire partagée de 95+ aliments dont des plats congolais
- Synchronisation en temps réel entre les deux apps
- Notifications croisées lors d'ajout, modification ou suppression d'aliments
- Mode Déficit / Maintenance
- Graphiques de poids, heatmap d'activité, anneaux de progression
- Jeûne intermittent 16:8
- Suivi de la corde à sauter et de la marche inclinée
- Support bilingue FR/EN
- Installable sur iPhone et Android (PWA)

---

## Déploiement (GitHub Pages)

1. Pousser tous les fichiers dans la branche `main`
2. Aller dans **Settings > Pages**
3. Source : `Deploy from a branch` → `main` → `/ (root)`
4. Les apps sont accessibles à :
   - `https://<username>.github.io/<repo>/merdi_fat_loss_v3_responsive.html`
   - `https://<username>.github.io/<repo>/benedicte_fat_loss_v3_responsive.html`

---

## Installation sur iPhone (PWA)

1. Ouvrir l'URL dans Safari
2. Appuyer sur le bouton Partager ↑
3. Sélectionner "Sur l'écran d'accueil"
4. Confirmer

---

*Fait avec ❤️ par Merdi Kapuku*
