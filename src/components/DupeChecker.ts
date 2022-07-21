export interface DupeChecker {
    isDuplicate(image: string): boolean;
    addImage(image: string): void;
}