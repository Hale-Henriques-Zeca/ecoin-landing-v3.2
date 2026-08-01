"use client";

import { useMemo } from "react";

import { GlossaryService } from "../services/GlossaryService";

export function useGlossary() {

    const glossary = useMemo(

        () => new GlossaryService(),

        []

    );

    async function load() {

        await glossary.load();

    }

    async function reload() {

        await glossary.reload();

    }

    async function compile() {

        await glossary.compile();

    }

    function getAll() {

        return glossary.getAll();

    }

    function find(

        term: string

    ) {

        return glossary.find(term);

    }

    function exists(

        term: string

    ) {

        return glossary.exists(term);

    }

    function isProtected(

        term: string

    ) {

        return glossary.isProtected(term);

    }

    async function protect(

        text: string

    ) {

        return glossary.protect(text);

    }

    async function replace(

        text: string

    ) {

        return glossary.replace(text);

    }

    function match(

        text: string

    ) {

        return glossary.match(text);

    }

    function validate(

        text: string

    ) {

        return glossary.validate(text);

    }

    return {

        load,

        reload,

        compile,

        getAll,

        find,

        exists,

        isProtected,

        protect,

        replace,

        match,

        validate,

        service: glossary

    };

}

export default useGlossary;