import { Page } from '@playwright/test';

export async function setLoginApiDown(page: Page): Promise<any>{
    await page.route('https://www.hudl.com/login', (route) => 
        route.fulfill({
            status: 404,
        })
    )
}

export async function setLoginApiUp(page: Page): Promise<any>{
    await page.unroute('')
}