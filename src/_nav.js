export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Data",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Laporan",
      url: "/data/laporan",
      icon: "icon-layers"
    },
    {
      name: "Jenis Laporan",
      url: "/data/JenisLaporan",
      icon: "icon-briefcase"
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "User",
      url: "/users",
      icon: "icon-user"
    },
    {
      name: "Logout",
      url: "/users",
      icon: "icon-logout"
    }
  ]
};
