import { defaultConfig } from "../../vendors/ew-angularjs-utils/common/default-config";

function camps() {
  return {
    actions: [],
    columns: [
      {
        label: "N",
        field: "n_scheda",
        filter: {
          field: "Camps.n_scheda",
          type: "like"
        },
        sort: {
          field: "n_scheda"
        }
      },
      {
        label: "Data scheda",
        field: `created | date:'dd/MM/yyyy'`
      },
      {
        label: "Capogruppo",
        field: "capogruppo.nome_cognome"
      },
      {
        label: "Nome",
        field: "nome"
      },
      {
        label: "Inizio",
        field: `data_inizio | date:'dd/MM/yyyy'`
      },
      {
        label: "Fine",
        field: `data_fine | date:'dd/MM/yyyy'`
      },
      {
        label: "Tipo",
        field: `tipo`
      },
      {
        label: "Chiuso",
        field: model => {
          const label = model.chiuso ? "success" : "danger";
          const text = model.chiuso ? "SI" : "NO";
          return `<p class="label label-${label}">${text}</p>`;
        }
      },
      {
        label: "",
        class: "actions",
        disableRowClick: true,
        field: model => {
          return `<a ui-sref="camps.edit({ id: row.id })" uib-tooltip="Modifica campo"><i class="far fa-edit"></i></a>`;
        }
      }
    ],
    rapidFilters: {
      effectiveButtons: [
        { label: "Prenotati", value: "0" },
        { label: "Confermati", value: "1" },
      ],
      stateButtons: [
        { label: "Aperti", value: "0" },
        { label: "Chiusi", value: "1" },
        { label: "Tutti", value: "" }
      ]
    }
  };
}

export const campsConfig = defaultConfig(camps());
