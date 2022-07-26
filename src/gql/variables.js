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
	$ID_CUENTA: Int!
  	$Nombre: String!
  	$Permisos: [Int]!
) {
	SetRangos(
		ID_CUENTA: $ID_CUENTA
		Nombre: $Nombre
		Permisos: $Permisos
  ) {
		response
  }
}`;
export const PerfilHeader = gql`
query Usuario(
	$ID_CUENTA: Int!
	$ID:Int!
	){
	Usuario(
		ID_CUENTA: $ID_CUENTA
		ID:$ID
		) {
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
		Estado
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
query Usuarios(
	$ID_CUENTA: Int!
	){
	Usuarios(
		ID_CUENTA: $ID_CUENTA
	){
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
	  Estado
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
query Usuario(
	$ID_CUENTA: Int!
	$ID:Int!
	){
	Usuario(
		ID_CUENTA: $ID_CUENTA
		ID:$ID
		) {
	  	ID
		Estado
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
query Rangos(
	$ID_CUENTA: Int!
	){
  Rangos(
	ID_CUENTA: $ID_CUENTA
  ) {
	  ID
	  Rango
	}
}
`;
export const GetPermisos = gql`
query Permisos(
	$ID_CUENTA: Int!
	){
	Permisos(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Permiso
	}
}
`;
export const GetRangoVista = gql`
query Rango(
	$ID_CUENTA: Int!
	$ID:Int!
	){
	Rango(
		ID_CUENTA: $ID_CUENTA
		ID:$ID) {
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
mutation SetPermiso(
	$ID_CUENTA: Int!
	$Permiso: String!
	) {
	SetPermiso(
		ID_CUENTA: $ID_CUENTA
		Permiso: $Permiso) {
		response
  }
}`;
export const SetRangosEdit = gql`
mutation EditRangos(
	$ID_CUENTA: Int!
	$ID: Int!
  	$Nombre: String!
  	$Permisos: [Int]!
) {
	EditRangos(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
		Nombre: $Nombre
		Permisos: $Permisos
  ) {
		response
  }
}`;
export const GetUsersRols = gql`
query Rango(
	$ID_CUENTA: Int!
	$ID:Int!
	){
	Rango(
		ID_CUENTA: $ID_CUENTA
		ID:$ID
		) {
		ID
		Rango
		RangoUsuario {
		  	ID
		  	Usuario {
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
		}
	}
}`;