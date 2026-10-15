import { MEMBER_AUTH_URL } from "@/lib/committee";

/**
 * Abre el portal externo de miembros en una pestaña nueva. Es la vía única para
 * todo documento con acceso `miembros`: la app no entrega el archivo, redirige a
 * `miembros.logyca.org` para autenticarse.
 *
 * TODO: cuando el portal permita volver, tras el login la persona debería
 * regresar al documento solicitado (ver nota junto a `MEMBER_AUTH_URL`).
 */
export const openMemberAuth = () => {
  window.open(MEMBER_AUTH_URL, "_blank", "noopener,noreferrer");
};
