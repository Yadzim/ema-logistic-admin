

export const isRoles = (roles: string[] | string) => {

  const _roles = JSON.parse(localStorage.getItem("roles") || "[]") // get roles

  if (typeof roles === "string") return roles === "*" || _roles.includes(roles)

  return roles.some(role => _roles.includes(role))
  
}