'use strict';

angular.module('rippleDemonstrator')
  .controller('MedicationsDetailCtrl', function ($scope, $stateParams, SearchInput, $modal, $location, $state, Helper, usSpinnerService, PatientService, Medication) {

    SearchInput.update();

    PatientService.get($stateParams.patientId).then(function (patient) {
      $scope.patient = patient;
    });

    Medication.get($stateParams.patientId, $stateParams.medicationIndex).then(function (result) {
      $scope.medication = result.data;
      usSpinnerService.stop('medicationsDetail-spinner');
    });

    $scope.edit = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/medications/medications-modal.html',
        size: 'lg',
        controller: 'MedicationsModalCtrl',
        resolve: {
          modal: function () {
            return {
              title: 'Edit Medication'
            };
          },
          medication: function () {
            return angular.copy($scope.medication);
          },
          patient: function () {
            return $scope.patient;
          }
        }
      });

      modalInstance.result.then(function (medication) {
        medication.startDate = new Date(medication.startDate);

        var toUpdate = {
          sourceId: medication.sourceId,
          doseAmount: medication.doseAmount,
          route: medication.route,
          doseDirections: medication.doseDirections,
          doseTiming: medication.doseTiming,
          medicationCode: medication.medicationCode,
          medicationTerminology: medication.medicationTerminology,
          name: medication.name,
          startDate: medication.startDate,
          startTime: medication.startTime,
          source: 'openehr'
        };

        Medication.update($scope.patient.id, toUpdate).then(function () {
           $state.go('medications-detail', { patientId: $scope.patient.id, medicationIndex: Helper.updateId(medication.sourceId) });
        });
      });
    };

  });
