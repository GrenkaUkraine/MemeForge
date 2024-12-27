import { DemotivatorGenerator } from '../src/index.mjs';
import path from 'path';
import { ImageLoader } from '../src/utils/ImageLoader.mjs';



class TestMemeForge {
    constructor(testDir = "test/") {
        this.testDir = testDir;
        this.testImagePath = path.join(this.testDir, 'test-image.jpg');
        this.testImage = new ImageLoader(this.testImagePath);
        this.testOutputDir = path.join(this.testDir, 'output');
    }

    async testDemotivator() {
        const testName = 'demotivator';


        const demotivatorGenerator = new DemotivatorGenerator(
            this.testImagePath
        );

        await demotivatorGenerator.generate(testName, "Bottom text");

        demotivatorGenerator.saveToFile(path.join(this.testOutputDir, testName + ".png"));
    }
}

const test = new TestMemeForge();
test.testDemotivator().catch(console.error);