// Single source of truth for site navigation.
// Navbar filters out `hideInNavbar`; Footer filters out `hideInFooter`.
// `footerName` overrides `name` when rendered inside the footer.
export const NAV_LINKS = [
  { name: "About", to: "/about" },
  { name: "Catalog", to: "/catalog" },
  { name: "Careers", to: "/careers" },
  { name: "News", to: "/news" },
  {
    name: "Tire Registration",
    href: "https://register.cimstireregistration.com/index.cfm?id=sutong",
    hideInNavbar: true,
  },
  {
    name: "Warranty",
    href: "https://warranty.sutongctr.com/warranty",
  },
  { name: "Contact", footerName: "Contact Us", to: "/contact" },
];
