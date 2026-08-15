# Contributing

This is a living repository that accompanies the survey **Deepfake Detection Beyond the Lab: A Survey of Real-World Distribution, Forensics, and Provenance**. The field moves faster than any single review, so contributions are welcome.

## Adding a paper

Open a pull request that adds a bullet to the relevant section of [`README.md`](README.md), using this exact format:

```markdown
• [Year] **Title** *First Author et al.* [[paper](link)]
```

Please also:

1. **Place it in the right section.** Sections mirror the survey's structure (generation taxonomy → detection families → lifecycle → datasets → governance).
2. **Keep entries in reverse-chronological order** within each subsection.
3. **State which assumptions it touches** in the PR description, if the work is a detection method or a benchmark. Use the `A1`–`A5` labels defined in [the README](README.md#-the-five-forensic-assumptions):

   | | Assumption |
   |---|---|
   | `A1` | A manipulated region leaves a boundary |
   | `A2` | A generator leaves a stable fingerprint |
   | `A3` | Test videos resemble the training data |
   | `A4` | Forensic signals survive processing |
   | `A5` | Low-level clues are enough |

4. **Prefer a stable link** — DOI, arXiv abstract page, or the official proceedings page. Avoid links to personal mirrors or PDFs that may move.

## Adding a dataset

Datasets go in the [Datasets & Benchmarks](README.md#5-datasets--benchmarks) section. Include size, modality (I / A / V / AV), task, and the assumptions the benchmark can stress-test.

## Reporting problems

Open an issue for:

- Broken or redirected links
- Missing categories or works we should have covered
- Errors in how a method or benchmark is characterized
- Suggestions for better organization

## Website

The project page lives in [`docs/`](docs/) and is served by GitHub Pages. It is plain HTML, CSS, and JavaScript with no build step — edit the files and open `docs/index.html` in a browser to preview.

Figures in `docs/images/` are rendered from the paper source. If a figure changes in the paper, regenerate the corresponding PNG rather than editing the image by hand.

## Scope

The survey is **video-centric**. Image-only and audio-only work is included where it directly informs audio-video analysis. Contributions well outside that scope may be declined with thanks — please open an issue first if you are unsure.
