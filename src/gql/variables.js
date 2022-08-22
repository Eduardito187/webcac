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
export const SetEstadoUsuario = gql`
mutation DisableUsuario(
	$ID_CUENTA: Int!
	$ID: Int!
  	$Estado: Boolean!
) {
	DisableUsuario(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
		Estado: $Estado
  ) {
		response
  }
}`;
export const GetJerarquias = gql`
query Jerarquias(
	$ID_CUENTA: Int!
	){
	Jerarquias(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Grado
	}
}
`;
export const ChangeJerarquia = gql`
mutation ActualizarJerarquia(
	$ID_CUENTA: Int!
	$ID: Int!
  	$Jerarquia: Int!
) {
	ActualizarJerarquia(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
		Jerarquia: $Jerarquia
  ) {
		response
  }
}`;
export const UpdateUsuario = gql`
mutation UpdateUsuario(
	$ID_CUENTA: Int!
	$ID: Int!
  	$Nombre: String!
	$Paterno: String!
	$Materno: String!
	$Correo: String!
	$Telefono: String!
) {
	UpdateUsuario(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
		Nombre: $Nombre
		Paterno: $Paterno
		Materno: $Materno
		Correo: $Correo
		Telefono: $Telefono
  ) {
		response
  }
}`;
export const DeleteUsuario = gql`
mutation DeleteUsuario(
	$ID_CUENTA: Int!
	$ID: Int!
) {
	DeleteUsuario(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
  ) {
		response
  }
}`;
export const SetRolesEdit = gql`
mutation EditRolesUsers(
	$ID_CUENTA: Int!
	$ID: Int!
  	$Roles: [Int]!
) {
	EditRolesUsers(
		ID_CUENTA: $ID_CUENTA
		ID: $ID
		Roles: $Roles
  ) {
		response
  }
}`;
export const CreateUsuarioAPI = gql`
mutation CreateUsuario(
	$ID_CUENTA: Int!
	$Escalafon: String!
	$Nombre: String!
	$Paterno: String!
	$Materno: String!
	$Telefono: String!
	$CI: String!
	$Correo: String!
	$Usuario: String!
	$Pwd: String!
	$Jerarquia: Int!
	$Nacimiento: String!
  	$Roles: [Int]!
) {
	CreateUsuario(
		ID_CUENTA: $ID_CUENTA
		Escalafon: $Escalafon
		Nombre: $Nombre
		Paterno: $Paterno
		Materno: $Materno
		Telefono: $Telefono
		CI: $CI
		Correo: $Correo
		Usuario: $Usuario
		Pwd: $Pwd
		Jerarquia: $Jerarquia
		Nacimiento: $Nacimiento
		Roles: $Roles
  ) {
		response
  }
}`;
export const GetBitacoralist = gql`
query HistorialActividades($ID_CUENTA: Int!){
	HistorialActividades(ID_CUENTA:$ID_CUENTA) {
		ID
		Glosa
		Actividad {
			ID
			Actividad
		}
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
				Direcicon
				Formato
				Peso
			}
			Escalafon
			JerarquiaR {
				ID
				Grado
			}
			Estado
		}
	}
}
`;
export const GetVacunas = gql`
query Vacunas(
	$ID_CUENTA: Int!
	){
		Vacunas(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Nombre
		Obligatorio
	}
}
`;
export const GetRazas = gql`
query Razas(
	$ID_CUENTA: Int!
	){
		Razas(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Nombre
	}
}
`;
export const GetDepartamentos = gql`
query Departamentos(
	$ID_CUENTA: Int!
	){
		Departamentos(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Nombre
	}
}
`;
export const GetProvincias = gql`
query Provincias(
	$ID_CUENTA: Int!
	){
		Provincias(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Nombre
	}
}
`;
export const GetMunicipios = gql`
query Municipios(
	$ID_CUENTA: Int!
	){
		Municipios(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Nombre
	}
}
`;
export const GetCantones = gql`
query Cantones(
	$ID_CUENTA: Int!
	){
		Cantones(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Canton
	}
}
`;
export const GetTipoDocumento = gql`
query TipoDocumento(
	$ID_CUENTA: Int!
	){
		TipoDocumento(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Tipo
	}
}
`;
export const GetZonas = gql`
query Zonas(
	$ID_CUENTA: Int!
	){
		Zonas(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Zona
	}
}
`;
export const GetBarrios = gql`
query Barrios(
	$ID_CUENTA: Int!
	){
		Barrios(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		Barrio
	}
}
`;
export const GetUVS = gql`
query UVS(
	$ID_CUENTA: Int!
	){
		UVS(
		ID_CUENTA: $ID_CUENTA
	) {
		ID
		UV
	}
}
`;