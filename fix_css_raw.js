const fs = require('fs');
const css = fs.readFileSync('src/app/globals.css', 'utf8');

const newCSS = css.replace(/\/\* Shared class for main mission text and vault intro \*\/.*/s, `/* Shared class for main mission text and vault intro */
.text-body-hero {
  font-size: 0.875rem; /* text-sm */
  line-height: 1.625; /* leading-relaxed */
  color: color-mix(in srgb, var(--color-accent) 90%, transparent);
}
@media (min-width: 640px) {
  .text-body-hero {
    font-size: 1rem; /* text-base */
  }
}
@media (min-width: 768px) {
  .text-body-hero {
    font-size: 1.5rem; /* text-2xl */
  }
}

/* Section Headings */
.heading-primary {
  font-family: var(--font-anton), "Anton", sans-serif;
  color: var(--color-secondary);
  letter-spacing: 0.025em; /* tracking-wide */
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06)); /* drop-shadow-md */
  margin-bottom: 1rem; /* mb-4 */
  font-size: 1.875rem; /* text-3xl */
  line-height: 2.25rem;
}
@media (min-width: 768px) {
  .heading-primary {
    font-size: 3.75rem; /* text-6xl */
    line-height: 1;
    margin-bottom: 2rem; /* mb-8 */
  }
}

/* Box Headings */
.heading-secondary {
  font-family: var(--font-anton), "Anton", sans-serif;
  color: var(--color-accent);
  letter-spacing: 0.025em; /* tracking-wide */
  margin-bottom: 0.75rem; /* mb-3 */
  font-size: 1.25rem; /* text-xl */
  line-height: 1.75rem;
}
@media (min-width: 768px) {
  .heading-secondary {
    font-size: 1.875rem; /* text-3xl */
    line-height: 2.25rem;
    margin-bottom: 1rem; /* mb-4 */
  }
}

/* Standard Paragraph Text */
.text-body-standard {
  font-size: 0.875rem; /* text-sm */
  line-height: 1.625; /* leading-relaxed */
  color: color-mix(in srgb, var(--color-accent) 80%, transparent);
}
@media (min-width: 768px) {
  .text-body-standard {
    font-size: 1.125rem; /* text-lg */
    line-height: 1.75rem;
  }
}

/* Standard Vintage Box */
.box-vintage {
  background-color: var(--color-primary);
  border: 2px solid var(--color-secondary);
  padding: 1rem; /* p-4 */
  box-shadow: 4px 4px 0 0 #6325a6; /* shadow-[4px_4px_0_0_#6325a6] */
}
@media (min-width: 768px) {
  .box-vintage {
    border-width: 4px;
    padding: 2rem; /* p-8 */
    box-shadow: 12px 12px 0 0 #6325a6; /* shadow-[12px_12px_0_0_#6325a6] */
  }
}
`);

fs.writeFileSync('src/app/globals.css', newCSS);
