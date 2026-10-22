import { test, expect } from "@playwright/test";

test.describe("NusaVoyage Travel & Booking E2E Test Suite", () => {
  test("1. Landing page loads correctly with Hero & Navbar", async ({ page }) => {
    await page.goto("/");
    // Cek header dan brand logo
    const brand = page.locator(".brand-name");
    await expect(brand).toBeVisible();
  });

  test("2. Paket wisata menampilkan harga di bawah 2 juta", async ({ page }) => {
    await page.goto("/");
    const priceElements = page.locator(".price-val");
    await expect(priceElements.first()).toBeVisible();
    
    // Verifikasi harga pertama di bawah 2 juta
    const text = await priceElements.first().textContent();
    expect(text).toContain("Rp 1.");
  });

  test("3. Tombol Pindai QRIS membuka modal dengan pemindai laser", async ({ page }) => {
    await page.goto("/");
    const btnQris = page.locator(".btn-pindai-qris").first();
    await btnQris.click();

    // Verifikasi modal terbuka
    const modal = page.locator(".booking-modal-card");
    await expect(modal).toBeVisible();

    // Verifikasi scanner laser aktif
    const laser = page.locator(".scanner-laser-bar");
    await expect(laser).toBeVisible();
  });
});
