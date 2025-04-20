// styles/global/breakpoints.ts
export const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px'
};

export const media = {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    laptop: `@media (min-width: ${breakpoints.laptop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`
};