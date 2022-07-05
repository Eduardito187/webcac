import gql from "graphql-tag";
export const Validar_URL = gql`
mutation validacion_login(
  $Usuario: String!
  $Contra: String!
) {
  validacion_login(
    Usuario: $Usuario
    Contra: $Contra
  ) {
    estado
    id_cuenta
  }
}`;
export const PerfilHeader = gql`
query Usuario($ID:Int!){
	Usuario(ID:$ID) {
	  ID
    Foto {
      ID
      URL
      Direcicon
      Formato
      Peso
    }
    Policia {
      ID
      Nombre
      Paterno
      Materno
      Correo
      Telefono
      CI
      Nacimiento
    }
    Rangos {
      ID
      Rango {
        ID
        Rango
      }
    }
	}
}`;
export const CuentaPermiso = gql`
query Usuario($ID:Int!){
	Usuario(ID:$ID) {
	  ID
    Rangos {
      ID
      Rango {
        ID
        Rango
      }
    }
	}
}`;