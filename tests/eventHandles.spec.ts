import { test, expect } from 'playwright/test'

test('download file', async ({ page }) => {
    await page.goto('https://playwrightlab.github.io/');
    const downloadBtn = page.locator('#downloadPdfBt');
    await downloadBtn.scrollIntoViewIfNeeded()
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloadBtn.click()
    ])
    download.suggestedFilename()
    await download.saveAs(`/home/arun/Desktop/${download.suggestedFilename()}`)
    await page.waitForTimeout(4000)
    await page.locator('').screenshot({})
})

test.skip('Upload file', async ({ page }) => {
    await page.goto('https://playwrightlab.github.io/');
    const uploadFile = page.locator('#singleUploadBrowseLabel');
    await uploadFile.scrollIntoViewIfNeeded();
    await uploadFile.setInputFiles('/home/arun/Desktop/testFile.pdf')
    await page.locator('#singleUploadBtn').click();
    await expect(page.locator('#singleUploadStatus')).toHaveText('Uploaded successfully!')
});

test.skip('download using page.on', async ({ page }) => {
    page.on('download', async downloadFile => { 
        await downloadFile.saveAs(`/home/arun/Desktop/${downloadFile.suggestedFilename()}`)
    })
    await page.goto('https://playwrightlab.github.io/');
    const downloadBtn = page.locator('#downloadPdfBtn');
    await downloadBtn.scrollIntoViewIfNeeded()
    await downloadBtn.click()
})

test.describe('Handling windows using page.on method', () => {

    test.beforeEach('Login', async ({ page }) => {
        await page.goto('https://playwrightlab.github.io/');
    })

    test('Close popup', async ({ page }) => {
        page.on('popup', async popupWindow => {
            await popupWindow.close()
        });
        const popupWindow = page.locator('#newTabBtn');
        await popupWindow.scrollIntoViewIfNeeded();
        await popupWindow.click();
    })

    test('close page', async ({ page }) => {
        page.context().on('page', async window => {
            await window.close()
        });
        const pageWindow = page.locator('#newTabBtn')
        await pageWindow.scrollIntoViewIfNeeded();
        await pageWindow.click();
    })
})

test.describe('Handling windows using wait for event method', () => {

    test.beforeEach('Login', async ({ page }) => {
        await page.goto('https://playwrightlab.github.io/');
    })


    test('Close popup', async ({ page }) => {
        const popupWindow = page.locator('#newTabBtn');

        const [popup] = await Promise.all([page.waitForEvent('popup'),
        popupWindow.scrollIntoViewIfNeeded(),
        popupWindow.click()
        ])
        await popup.close()
    })

    test('Close page', async ({ page }) => {
        const pageWindow = page.locator('#newTabBtn')
        await pageWindow.scrollIntoViewIfNeeded();
        const [newpage] = await Promise.all([
            page.context().waitForEvent('page'),
            pageWindow.click()
        ])
        await newpage.close()
    })
});

test.describe('Peform action in the newPage', () => {

    test.beforeEach('Login', async ({ page }) => {
        await page.goto('https://playwrightlab.github.io/');
    })

    test('Using page-on', async ({ page }) => {

        page.context().on('page', async newPage => {
            await expect(newPage.locator('#welcomeTitle')).toHaveText('Welcome back!')
            await newPage.close()
        });

        const pageWindow = page.locator('#newTabBtn')
        await pageWindow.scrollIntoViewIfNeeded();
        await pageWindow.click();
    })

    test('using wait for event', async ({ page }) => {
        const pageWindow = page.locator('#newTabBtn')
        await pageWindow.scrollIntoViewIfNeeded();
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            pageWindow.click()
        ])
        await expect(newPage.locator('#welcomeTitle')).toHaveText('Welcome back!')
        await newPage.close()
    })
})


test.describe('Peform action in the pop up', () => {

    test.beforeEach('Login', async ({ page }) => {
        await page.goto('https://playwrightlab.github.io/');
    })

    test('Using the page-on', async ({ page }) => {

        page.on('popup', async popup => {
            await expect(popup.locator('#welcomeTitle')).toHaveText('Welcome back!')
            await popup.close()
        })
        const popupWindow = page.locator('#newTabBtn');
        await popupWindow.scrollIntoViewIfNeeded();
        await popupWindow.click();

    })



    test('using wait for event', async ({ page }) => { 
        const popupWindow = page.locator('#newTabBtn');
        await popupWindow.scrollIntoViewIfNeeded();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            popupWindow.click()
        ])
        await expect(newPage.locator('#welcomeTitle')).toHaveText('Welcome back!')
        await newPage.close()
    })


})
