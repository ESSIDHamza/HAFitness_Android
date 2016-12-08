var monApplication = angular.module("mon-application", [ "ngRoute" ]);

monApplication.config(function($routeProvider) {
	$routeProvider.when("/contacts", {
		templateUrl : "/templates/contacts.html"
	}).when("/inscription", {
		templateUrl : "/templates/inscription.html"
	}).when("/consulter-infos", {
		templateUrl : "/templates/informations.html"
	}).when("/liste", {
		templateUrl : "/templates/liste.html"
	}).when("/calculs", {
		templateUrl : "/templates/calculs.html"
	}).otherwise({
		templateUrl : "/templates/contacts.html"
	});
});

monApplication.controller("menuCtrl", function($scope) {
	$scope.setRubrique = function(rubrique) {
		$scope.rubrique = rubrique;
	};
});

monApplication.controller("inscriptionCtrl", function($scope, $http) {
	$scope.inscrire = function() {
		$http.post("http://localhost:8080/api/coaches", {
			nom : $scope.nom,
			prenom : $scope.prenom,
			age : $scope.age,
			sexe : $scope.sexe,
			taille : $scope.taille,
			poids : $scope.poids,
			morphologie : $scope.morphologie,
			objectif : $scope.objectif,
			disponibilite : $scope.disponibilite,
			blessure : $scope.blessure,
			niveau : $scope.niveau,
			mail : $scope.mail
		}).success(function() {
			$scope.nom = "";
			$scope.prenom = "";
			$scope.age = "";
			$scope.sexe = "";
			$scope.taille = "";
			$scope.poids = "";
			$scope.morphologie = "";
			$scope.objectif = "";
			$scope.disponibilite = "";
			$scope.blessure = "";
			$scope.niveau = "";
			$scope.mail = "";
			$scope.inscriptionForm.$setPristine();
			$scope.msgSuccIns = "Succès d'inscription !";
		});
	};
});

monApplication
		.controller(
				"consulterInfosCtrl",
				function($scope, $http, $window) {
					$scope.notifier=function (newV, oldV) {
						$scope.infos=false ;
						$scope.envoiMail=false ;
					} ;
					$scope.consulterInfos = function() {
						$scope.suivi1RM = false;
						$scope.suiviTPMA = false;
						$scope.suivi_1rm = false;
						$scope.suivi_tpma = false;
						$scope.envoiMail = false;
						$http
								.get(
										"http://localhost:8080/api/coaches/"
												+ $scope.idCoache)
								.success(
										function(reponse) {
											if (reponse == "") {
												$scope.infos = false;
												alert("Veuillez vérifier # Coaché(e) !");
											} else {
												$scope.nom = reponse.nom;
												$scope.prenom = reponse.prenom;
												$scope.age = reponse.age;
												$scope.sexe = reponse.sexe;
												$scope.taille = reponse.taille;
												$scope.poids = reponse.poids;
												$scope.morphologie = reponse.morphologie;
												$scope.objectif = reponse.objectif;
												$scope.disponibilite = reponse.disponibilite;
												$scope.blessure = reponse.blessure;
												$scope.niveau = reponse.niveau;
												$scope.mail = reponse.mail;
												$scope.tourBiceps = reponse.tourBiceps;
												$scope.tourPectoraux = reponse.tourPectoraux;
												$scope.tourTaille = reponse.tourTaille;
												$scope.tourHanches = reponse.tourHanches;
												$scope.tourMollet = reponse.tourMollet;
												$scope.infos = true;
											}
										});
					};
					$scope.afficherSuivi1RM = function() {
						$scope.suivi1RM = true;
					};
					$scope.afficherSuiviTPMA = function() {
						$scope.suiviTPMA = true;
					};
					$scope.genererFiche = function() {
						if (($scope.suivi_1rm) && ($scope.suivi_tpma))
							$http
									.get(
											"http://localhost:8080/api/coaches/"
													+ $scope.idCoache
													+ "/fiche/all")
									.success(
											function() {
												alert ("La fiche a été générée avec succès !\nC: > HAFitness > fiches > " + $scope.idCoache + ".pdf") ;
												$scope.envoiMail = true;
											});
						else if ($scope.suivi_1rm)
							$http.get(
									"http://localhost:8080/api/coaches/"
											+ $scope.idCoache
											+ "/fiche/suivi_1rm").success(
									function() {
										alert ("La fiche a été générée avec succès !\nC: > HAFitness > fiches > " + $scope.idCoache + ".pdf") ;
										$scope.envoiMail = true;
									});
						else if ($scope.suivi_tpma)
							$http.get(
									"http://localhost:8080/api/coaches/"
											+ $scope.idCoache
											+ "/fiche/suivi_tpma").success(
									function() {
										alert ("La fiche a été générée avec succès !\nC: > HAFitness > fiches > " + $scope.idCoache + ".pdf") ;
										$scope.envoiMail = true;
									});
						else
							$http
									.get(
											"http://localhost:8080/api/coaches/"
													+ $scope.idCoache
													+ "/fiche/min")
									.success(
											function() {
												alert ("La fiche a été générée avec succès !\nC: > HAFitness > fiches > " + $scope.idCoache + ".pdf") ;
												$scope.envoiMail = true;
											});
					};
					$scope.envoyer = function() {
						$http
								.post("http://localhost:8080/api/coaches/mail",
										{
											destinataire : $scope.mail,
											sujet : $scope.sujet,
											contenu : $scope.contenu,
											fiche : $scope.idCoache
										})
								.success(function(reponse) {
									alert("E-mail envoyé avec succès !");
									$scope.sujet = "";
									$scope.contenu = "";
									$scope.mailForm.$setPristine();
								})
								.error(
										function() {
											alert("Echec de l'envoi de votre mail !\nVeuillez vérifiez votre connexion internet puis réessayer.");
										});
					};
				});

monApplication.controller("modificationCtrl", function($scope, $http) {
	$scope.modifier = function() {
		$http.put("http://localhost:8080/api/coaches/" + $scope.idCoache, {
			nom : $scope.nom,
			prenom : $scope.prenom,
			age : $scope.age,
			sexe : $scope.sexe,
			taille : $scope.taille,
			poids : $scope.poids,
			morphologie : $scope.morphologie,
			objectif : $scope.objectif,
			disponibilite : $scope.disponibilite,
			blessure : $scope.blessure,
			niveau : $scope.niveau,
			mail : $scope.mail,
			tourBiceps : $scope.tourBiceps,
			tourPectoraux : $scope.tourPectoraux,
			tourTaille : $scope.tourTaille,
			tourHanches : $scope.tourHanches,
			tourMollet : $scope.tourMollet
		}).success(function(reponse) {
			alert("Les informations ont été modifiées avec succès !");
		});
	};
});

monApplication.controller("1rmCtrl", function($scope, $http) {
	$http.get(
			"http://localhost:8080/api/coaches/" + $scope.idCoache
					+ "/fiche/1rm").success(function(reponse) {
		$scope.donnees1RMs = reponse;
	});
	$scope.modifier1RM = function() {
		$http.put(
				"http://localhost:8080/api/coaches/" + $scope.idCoache
						+ "/fiche/1rm", $scope.donnees1RMs).success(function() {
			alert("Modification effectuée avec succès !");
		});
	};
});

monApplication.controller("tpmaCtrl", function($scope, $http) {
	$http.get(
			"http://localhost:8080/api/coaches/" + $scope.idCoache
					+ "/fiche/tpma").success(function(reponse) {
		$scope.donneesTPMAs = reponse;
	});
	$scope.modifierTPMA = function() {
		$http.put(
				"http://localhost:8080/api/coaches/" + $scope.idCoache
						+ "/fiche/tpma", $scope.donneesTPMAs).success(
				function() {
					alert("Modification effectuée avec succès !");
				});
	};
});

monApplication.controller("listeCtrl", function($scope, $http) {
	$http.get("http://localhost:8080/api/coaches").success(function(reponse) {
		$scope.coaches = reponse;
	});
	$scope.supprimer=function (idCoache) {
		var vb=confirm ("Êtes-vous sûr de vouloir supprimer le/la coaché(e) # " + idCoache + " ?") ;
		if (vb)
		$http.delete ("http://localhost:8080/api/coaches/" + idCoache).success (function () {
			$http.get("http://localhost:8080/api/coaches").success(function(reponse) {
				$scope.coaches = reponse;
			});
		}) ;
	} ;
});

monApplication
		.controller(
				"calculsCtrl",
				function($scope, $http) {
					$scope.calculer = function() {
						$http
								.post("http://localhost:8080/api/calculs", {
									age : $scope.age,
									sexe : $scope.sexe,
									taille : $scope.taille,
									poids : $scope.poids,
									pouls1 : $scope.pouls1,
									pouls2 : $scope.pouls2,
									pouls3 : $scope.pouls3,
									disponibilite : $scope.disponibilite
								})
								.success(
										function(reponse) {
											$scope.age = "";
											$scope.sexe = "";
											$scope.taille = "";
											$scope.poids = "";
											$scope.poulsRepos = $scope.pouls1;
											$scope.pouls1 = "";
											$scope.pouls2 = "";
											$scope.pouls3 = "";
											$scope.disponibilite = "";
											$scope.poidsIdeal = reponse.poidsIdeal;
											$scope.BMI = reponse.bmi;
											$scope.interpretationBMI = reponse.interpretationBMI;
											$scope.MB = reponse.mb;
											$scope.MG = reponse.mg;
											if (reponse.masseMaigre == -1) {
												$scope.erreurConditionsFormuleMasseMaigre = "Les données saisies ne satisfont pas les conditions d'application de la formule du calcul de la masse maigre !";
												$scope.masseMaigre = null;
												$scope.Kg = null;
											} else {
												$scope.masseMaigre = reponse.masseMaigre;
												$scope.Kg = "Kg";
												$scope.erreurConditionsFormuleMasseMaigre = null;
											}
											$scope.masseHydrique = reponse.masseHydrique;
											$scope.frequenceCardiaqueMax = reponse.frequenceCardiaqueMax;
											$scope.indiceRuffier = reponse.indiceRuffier;
											$scope.interpretationIndiceRuffier = reponse.interpretationIndiceRuffier;
											$scope.indiceDickson = reponse.indiceDickson;
											$scope.interpretationIndiceDickson = reponse.interpretationIndiceDickson;
											$scope.calculs = true;
											$scope.calculsForm.$setPristine();
										});
					};
				});