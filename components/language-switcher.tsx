import { useLanguage } from '@/contexts/language-context';
import { Button } from '@chakra-ui/react';

export function LanguageSwitcher() {
    const { currentLanguage, setLanguage } = useLanguage();

    return (
        <Button
            onClick={() => setLanguage(currentLanguage === 'en' ? 'zh' : 'en')}
            size="sm"
        >
            {currentLanguage === 'en' ? '中文' : 'English'}
        </Button>
    );
} 