  export const extractNumbers = (text: string): number => {
    try {
      const match = text.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    } catch (error) {
        console.error('Error extracting numbers:', error);
        return 0;
    }
  }