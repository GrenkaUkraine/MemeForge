import { ClassicMemeGenerator } from '../src/generators/ClassicMemeGenerator.mjs';
import { GreatPeopleQuoteGenerator } from '../src/generators/GreatPeopleQuoteGeneratorю.mjs';
import { DemotivatorGenerator } from '../src/index.mjs';
import path from 'path';



class TestMemeForge {
    constructor(testDir = "test/") {
        this.testDir = testDir;
        this.testImagePath = path.join(this.testDir, 'test-image.jpg');
        this.testOutputDir = path.join(this.testDir, 'output');
    }

    async testDemotivator() {
        const testName = 'Demotivator';


        const demotivatorGenerator = new DemotivatorGenerator(
            this.testImagePath
        );

        await demotivatorGenerator.generate(testName, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra eu magna eu ultrices. Vestibulum massa risus, interdum volutpat pharetra cursus, ullamcorper eget leo. In eleifend est nec metus tempor, eu interdum erat sodales. Nullam egestas feugiat enim id elementum. Sed massa nisi, convallis nec arcu nec, interdum pharetra odio. Aliquam vitae auctor neque. Maecenas nec sem in quam pulvinar pellentesque nec sed lacus.");

        demotivatorGenerator.saveToFile(path.join(this.testOutputDir, testName + ".png"));
    }

    async testClassicMeme() {
        const testName = 'ClassicMeme';


        const classicMemeGenerator = new ClassicMemeGenerator(
            this.testImagePath
        );

        await classicMemeGenerator.generate(testName, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

        classicMemeGenerator.saveToFile(path.join(this.testOutputDir, testName + ".png"));
    }

    async testGreatPeopleQuote() {
        const testName = 'GreatPeopleQuote';


        const greatPeopleQuoteGenerator = new GreatPeopleQuoteGenerator(
            this.testImagePath
        );

        await greatPeopleQuoteGenerator.generate(testName, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "GrenkaUkraine");

        greatPeopleQuoteGenerator.saveToFile(path.join(this.testOutputDir, testName + ".png"));
    }
}

const test = new TestMemeForge();
test.testDemotivator().catch(console.error);
test.testClassicMeme().catch(console.error);
test.testGreatPeopleQuote().catch(console.error);