import { Plugin } from "../types/Plugin";

interface ReactToken {

    token: string;

    original: string;

}

export default class ReactPlugin implements Plugin {

    public readonly name = "ReactPlugin";

    private tokens: ReactToken[] = [];

    beforeTranslate(text: string): string {

        this.tokens = [];

        let index = 0;

        /**
         * Protege componentes JSX
         */

        const jsxRegex = /<\/?[A-Z][A-Za-z0-9]*[^>]*>/g;

        let result = text.replace(

            jsxRegex,

            (match) => {

                const token = `__REACT_COMPONENT_${index++}__`;

                this.tokens.push({

                    token,

                    original: match

                });

                return token;

            }

        );

        /**
         * Protege expressões JSX
         */

        result = result.replace(

            /\{[^{}]+\}/g,

            (match) => {

                const token = `__REACT_EXPR_${index++}__`;

                this.tokens.push({

                    token,

                    original: match

                });

                return token;

            }

        );

        return result;

    }

    afterTranslate(text: string): string {

        let result = text;

        for (const item of this.tokens) {

            result = result.replaceAll(

                item.token,

                item.original

            );

        }

        return result;

    }

    getTokens(): ReactToken[] {

        return this.tokens;

    }

    clear() {

        this.tokens = [];

    }

}