function transformKeywordsToQuery(keywords: string[]): string {
    const query = keywords.join(' OR ');
    return encodeURIComponent(query);
}

export default transformKeywordsToQuery