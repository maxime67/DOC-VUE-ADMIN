<!-- CGUComponent.vue -->
<template>
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-4 py-12 max-w-3xl">
        <!-- Page Title -->
        <h1 class="text-2xl font-bold text-gray-900 mb-8">
          📋 Conditions Générales d'Utilisation
        </h1>

        <!-- Main Content -->
        <div class="space-y-8 bg-white p-6 rounded-xl shadow-sm">
          <!-- Introduction -->
          <div class="text-gray-700 leading-relaxed">
            Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par Heim Maxime et de définir les conditions d'accès et d'utilisation des services par « l'Utilisateur ». Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
          </div>

          <!-- Article 1 -->
          <div class="space-y-2">
            <h2 class="text-lg font-medium text-gray-900">📝 Article 1 : Les mentions légales</h2>
            <div class="space-y-4 text-gray-700">
              <p>L'édition et la direction de la publication du site https://easysetup.fr/ est assurée par Heim Maxime, domicilié _______________.</p>
              <div class="pl-4 border-l-2 border-gray-200">
                <p>Numéro de téléphone : _______________</p>
                <p>Adresse e-mail : _______________</p>
              </div>
              <p>L'hébergeur du site https://easysetup.fr/ est la société Heim Maxime, dont le siège social est situé au _______________, avec le numéro de téléphone : _______________.</p>
            </div>
          </div>

          <!-- Article 2 -->
          <div class="space-y-2">
            <h2 class="text-lg font-medium text-gray-900">🌐 Article 2 : Accès au site</h2>
            <div class="space-y-4 text-gray-700">
              <p>Le site https://easysetup.fr/ permet à l'Utilisateur un accès gratuit aux services suivants :</p>
              <ul class="list-disc pl-6">
                <li>Distribution de documentation technique</li>
              </ul>
              <p>Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.</p>
            </div>
          </div>

          <!-- Article 3 -->
          <div class="space-y-2">
            <h2 class="text-lg font-medium text-gray-900">🔒 Article 3 : Collecte des données</h2>
            <div class="space-y-4 text-gray-700">
              <p>Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.</p>
              <p>En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles.</p>
            </div>
          </div>

          <!-- Article 4 -->
          <div class="space-y-2">
            <h2 class="text-lg font-medium text-gray-900">©️ Article 4 : Propriété intellectuelle</h2>
            <div class="space-y-4 text-gray-700">
              <p>Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.</p>
              <p>L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.</p>
            </div>
          </div>

          <!-- Articles 5-8 suivent le même modèle -->

          <!-- Update Date -->
          <div class="pt-6 text-gray-500 text-sm text-right">
            Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>

</script>