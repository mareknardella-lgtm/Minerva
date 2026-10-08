import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function runDemo() {
  console.log('🚀 Launching Chromium for 1080p Screenshot & Video Demo Recording...');
  
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: './media/video',
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Capture High-Definition Screenshot: Socratic Tutor
  console.log('📸 Capturing Screenshot 1: Socratic Tutor...');
  await page.screenshot({ path: './media/screenshots/01_socratic_tutor.png', fullPage: false });

  // Walkthrough: Socratic Tutor
  await page.waitForTimeout(1500);
  await page.click('text=Executive Micro-Steps');
  await page.waitForTimeout(1500);
  // Toggle a micro-step
  const stepCard = page.locator('text=1. Inputs & Features');
  if (await stepCard.count() > 0) {
    await stepCard.click();
  }
  await page.waitForTimeout(1200);

  await page.click('text=ELI5 Simplification');
  await page.waitForTimeout(1500);
  await page.click('text=Formal Deep Dive');
  await page.waitForTimeout(1500);
  await page.click('text=Socratic Dialogue');
  await page.waitForTimeout(1500);

  // 2. Navigate to Interactive Labs
  console.log('🧪 Navigating to Interactive Labs...');
  await page.click('role=tab >> text=Interactive Labs');
  await page.waitForTimeout(1200);

  // Capture Screenshot 2: Interactive Labs
  console.log('📸 Capturing Screenshot 2: Interactive Labs...');
  await page.screenshot({ path: './media/screenshots/02_interactive_labs_perceptron.png', fullPage: false });

  // Train Perceptron live
  console.log('⚡ Training Perceptron Live...');
  await page.click('text=Train Perceptron');
  await page.waitForTimeout(4000); // Watch it converge to 100%

  // Switch to Transformer Attention
  await page.click('text=2. Transformer Attention');
  await page.waitForTimeout(1500);
  console.log('📸 Capturing Screenshot 3: Transformer Attention...');
  await page.screenshot({ path: './media/screenshots/03_interactive_labs_attention.png', fullPage: false });

  // Select different tokens
  const tokenPills = page.locator('text=students');
  if (await tokenPills.count() > 0) {
    await tokenPills.first().click();
  }
  await page.waitForTimeout(1500);

  // Switch to Convolution Kernels
  await page.click('text=3. Convolution Kernels');
  await page.waitForTimeout(1500);
  await page.click('text=Sharpening');
  await page.waitForTimeout(1500);

  // 3. Navigate to Impact Launchpad
  console.log('🚀 Navigating to Impact Launchpad...');
  await page.click('role=tab >> text=Impact Launchpad');
  await page.waitForTimeout(1500);
  console.log('📸 Capturing Screenshot 4: Impact Launchpad...');
  await page.screenshot({ path: './media/screenshots/04_impact_launchpad.png', fullPage: false });

  await page.click('text=Architecture');
  await page.waitForTimeout(1500);
  await page.click('text=Starter Code');
  await page.waitForTimeout(1500);
  await page.click('text=Datasets');
  await page.waitForTimeout(1500);

  // 4. Navigate to Devpost Pitch
  console.log('📋 Navigating to Devpost Pitch...');
  await page.click('role=tab >> text=Devpost Pitch');
  await page.waitForTimeout(1500);
  console.log('📸 Capturing Screenshot 5: Devpost Pitch...');
  await page.screenshot({ path: './media/screenshots/05_devpost_pitch.png', fullPage: false });
  await page.waitForTimeout(2000);

  // Close page to save video
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const rawVideoPath = await video.path();
    console.log(`🎬 Raw WebM video recorded at: ${rawVideoPath}`);

    const outputMp4Path = path.resolve('./media/minerva_demo_video.mp4');
    console.log(`🔄 Converting video to high-definition MP4 with ffmpeg -> ${outputMp4Path}...`);

    try {
      execSync(`ffmpeg -y -i "${rawVideoPath}" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 22 "${outputMp4Path}"`, {
        stdio: 'inherit'
      });
      console.log(`✅ Demo video successfully generated at: ${outputMp4Path}`);
    } catch (err) {
      console.error('Error during ffmpeg conversion:', err);
    }
  }

  console.log('🎉 All screenshots and demo video completed successfully!');
}

runDemo().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
