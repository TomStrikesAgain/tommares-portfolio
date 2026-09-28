const fs = require('fs');

const css = fs.readFileSync('src/app/globals.css', 'utf8');

const newCSS = css.replace(/\/\* Section Headings \*\/.*/s, `/* Section Headings */
.heading-primary {
  @apply text-3xl text-secondary mb-4 tracking-wide drop-shadow-md;
  font-family: var(--font-anton), "Anton", sans-serif;
}
@media (min-width: 768px) {
  .heading-primary {
    @apply text-6xl mb-8;
  }
}

/* Box Headings */
.heading-secondary {
  @apply text-xl mb-3 text-accent tracking-wide;
  font-family: var(--font-anton), "Anton", sans-serif;
}
@media (min-width: 768px) {
  .heading-secondary {
    @apply text-3xl mb-4;
  }
}

/* Standard Paragraph Text */
.text-body-standard {
  @apply text-sm leading-relaxed;
  color: color-mix(in srgb, var(--color-accent) 80%, transparent);
}
@media (min-width: 768px) {
  .text-body-standard {
    @apply text-lg;
  }
}

/* Standard Vintage Box */
.box-vintage {
  @apply border-2 border-secondary bg-primary p-4 shadow-[4px_4px_0_0_#6325a6];
}
@media (min-width: 768px) {
  .box-vintage {
    @apply border-4 p-8 shadow-[12px_12px_0_0_#6325a6];
  }
}
`);

fs.writeFileSync('src/app/globals.css', newCSS);
