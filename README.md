# MemeForge

MemeForge is a powerful and flexible meme generation library using Node.js and Canvas. It provides several generators for creating classic memes, demotivators, and images with quotes from great people.

## 🚀 Installation

Install the library via npm:

```bash
npm install memeforge
```

## ✨ Features

- **ClassicMemeGenerator**: Generate classic memes with upper and lower text.
- **DemotivatorGenerator**: Creating demotivators with custom fonts and sizes.
- **GreatPeopleQuoteGenerator**: Generate images with quotes from great people.

## 📖 Usage

Example of using `ClassicMemeGenerator`:

```javascript
import { ClassicMemeGenerator } from 'memeforge';

const meme = new ClassicMemeGenerator('path/to/image.jpg');

(async () => {
    await meme.generate('Top text', 'Bottom text');
    meme.saveToFile("output.png");
})();
```

Example of using `DemotivatorGenerator`:

```javascript
import { DemotivatorGenerator } from 'memeforge';

const demotivator = new DemotivatorGenerator('path/to/image.jpg');

(async () => {
    await demotivator.generate('Title', 'Subtitle');
    demotivator.saveToFile("output.png");
})();
```

Example of using `GreatPeopleQuoteGenerator`:

```javascript
import { GreatPeopleQuoteGenerator } from 'memeforge';

const quoteImage = new GreatPeopleQuoteGenerator('path/to/avatar.jpg');

(async () => {
    await quoteImage.generate('Title', 'Quote', 'Author');
    quoteImage.saveToFile("output.png");
})();
```

## ✏️ Customization

Each generator supports font settings via the `FontSettings` object. Example:

```javascript
import { FontSettings } from 'memeforge';

const fontSettings = new FontSettings(
    'Arial',  // Font
    40,       // Font size
    'italic', // Font style (normal, italic, bold, etc.)
    'yellow', // Text color
    'red',    // Border color
    5         // Border thickness
);
```

These settings can be passed to the generator constructor:

```javascript
const meme = new ClassicMemeGenerator('path/to/image.jpg', fontSettings);
```

## ⚙️ Dependencies

- [canvas](https://www.npmjs.com/package/canvas): For working with images.
- [Node.js](https://www.nodejs.org) version 16+.

## 📜 License

MemeForge is distributed under the MIT license. See the [LICENSE](LICENSE) file for details.

---

Create memes quickly and easily with MemeForge!

