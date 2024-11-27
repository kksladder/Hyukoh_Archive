import { extendTheme } from '@chakra-ui/theme-utils';
import { Container } from './components/container';

const theme = extendTheme({
    components: {
        Container,
    },
});

export default theme;
