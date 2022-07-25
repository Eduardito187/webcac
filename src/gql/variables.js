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
export const SetRangosCreate = gql`
mutation SetRangos(
  $Nombre: String!
  $Permisos: [Int]!
) {
	SetRangos(
		Nombre: $Nombre
		Permisos: $Permisos
  ) {
		response
  }
}`;
export const PerfilHeader = gql`
query Usuario($ID:Int!){
	Usuario(ID:$ID) {
	  ID
    Usuario
	  PoliciaR {
	    ID
	    Nombre
	    Paterno
	    Materno
	    Correo
	    Telefono
	    CI
	    Nacimiento
	  }
	  FotoR {
	    ID
	    URL
	  }
	  Escalafon
	  JerarquiaR {
	    ID
	    Grado
	  }
    RangoUsuario {
      ID
      Rango {
        ID
        Rango
      }
    }
	}
}`;
export const GetUserList = gql`
query Usuarios{
	Usuarios{
	  ID
    Usuario
	  PoliciaR {
	    ID
	    Nombre
	    Paterno
	    Materno
	    Correo
	    Telefono
	    CI
	    Nacimiento
	  }
	  FotoR {
	    ID
	    URL
	  }
	  Escalafon
	  JerarquiaR {
	    ID
	    Grado
	  }
    RangoUsuario {
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
		RangoUsuario {
		ID
			Rango {
				ID
				Rango
			}
		}
	}
}`;
export const GetRoles = gql`
query Rangos{
  Rangos {
	  ID
	  Rango
	}
}
`;
export const GetPermisos = gql`
query Permisos{
	Permisos {
		ID
		Permiso
	}
}
`;
export const GetRangoVista = gql`
query Rango($ID:Int!){
	Rango(ID:$ID) {
		ID
		Rango
		RangoPermiso {
			ID
			RangoPermiso {
				ID
				Permiso
			}
		}
	}
}`;
export const SetPermisoCreate = gql`
mutation SetPermiso($Permiso: String!) {
	SetPermiso(Permiso: $Permiso) {
		response
  }
}`;
export const SetRangosEdit = gql`
mutation EditRangos(
	$ID: Int!
  	$Nombre: String!
  	$Permisos: [Int]!
) {
	EditRangos(
		ID: $ID
		Nombre: $Nombre
		Permisos: $Permisos
  ) {
		response
  }
}`;