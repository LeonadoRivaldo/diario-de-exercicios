import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private appKey = "diary"

    constructor() {}

    // 1. Set Item (supports strings or objects)
    setItem(key: string, value: any): void {
        const data = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(`${this.appKey}-${key}`, data);
    }

    // 2. Get Item
    getItem(key: string): string | null {
        return localStorage.getItem(`${this.appKey}-${key}`);
    }

    // 3. Get Object (parsed)
    getObject<T>(key: string): T | null {
        const data = localStorage.getItem(`${this.appKey}-${key}`);
        if (!data) return null;
        try {
            return JSON.parse(data) as T;
        } catch (e) {
            console.error('Error parsing localStorage item', e);
            return null;
        }
    }

    // 4. Remove Item
    removeItem(key: string): void {
        localStorage.removeItem(`${this.appKey}-${key}`);
    }

    // 5. Clear All
    clear(): void {
        localStorage.clear();
    }
}
