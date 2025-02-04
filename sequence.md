```mermaid
    sequenceDiagram
        actor U as Utilisateur
        participant UI as Application Cliente
        participant API as API
        participant DB as Base de données
        
        Note over U,DB: Création de documentation
        U->>UI: Cliquer "Nouvelle Documentation"
        UI->>UI: Afficher le formulaire
        U->>UI: Saisir URL & métadonnées
        UI->>API: POST /documentation
        API->>API: Valider les données
        API->>DB: Insérer documentation
        DB-->>API: Confirmer insertion
        API-->>UI: Retourner ID documentation
        UI-->>U: Afficher confirmation
        
        Note over U,DB: Lecture de documentation
        U->>UI: Sélectionner documentation
        UI->>API: GET /documentation/{id}
        API->>DB: Requête documentation
        DB-->>API: Retourner données
        API-->>UI: Envoyer documentation
        UI-->>U: Afficher documentation
        
        Note over U,DB: Modification de documentation
        U->>UI: Modifier documentation
        UI->>UI: Afficher formulaire d'édition
        U->>UI: Mettre à jour données
        UI->>API: PUT /documentation/{id}
        API->>API: Valider modifications
        API->>DB: Mettre à jour documentation
        DB-->>API: Confirmer mise à jour
        API-->>UI: Retourner documentation modifiée
        UI-->>U: Afficher confirmation
        
        Note over U,DB: Suppression de documentation
        U->>UI: Cliquer "Supprimer"
        UI->>UI: Demander confirmation
        U->>UI: Confirmer suppression
        UI->>API: DELETE /documentation/{id}
        API->>DB: Supprimer documentation
        DB-->>API: Confirmer suppression
        API-->>UI: Confirmer suppression
        UI-->>U: Afficher confirmation