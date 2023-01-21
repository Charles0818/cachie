import { Request, Response } from 'express'
class SearchService {
    private searches: string[];
    constructor() {
        this.searches = [];
    }
    postSearch = (req: Request, res: Response) => {
        const search = req.query.search_query as string;
        if(typeof search !== 'string' || search.length < 1) return res.status(400).send({ message: 'Invalid search query' });
        this.searches.push(search.toLowerCase());
        return res.status(200).json({ status: 'ok', code: 200 }); //refactor this
    }

    /**
     * Time complexity - O(n)
     */
    analyseSearch = (req: Request, res: Response) => {
        const tokens = req.query.analysis_token as string;
        const timestamp = parseInt(req.query.timestamp as string);
        const flatMappedSearches = this.searches.join(",")
        if(typeof tokens !== 'string' || tokens.length < 1) return res.status(400).send({ message: 'Invalid analysis_token query' });
        const splitToken = tokens.split(',');
        console.log({splitToken})
        let occurrences: { [key: string]: number } = {};
        for(let index = 0; index < splitToken.length; index ++) {
            var regex = new RegExp( splitToken[index], 'g' );
            flatMappedSearches.match(regex)?.length;
            occurrences[splitToken[index]] = flatMappedSearches.match(regex)?.length || 0;
        }
        // clearInterval(interval)
        return res.status(200).json({
            status: 'ok',
            code: 200,
            results: occurrences,
            time: `${Date.now() - timestamp}ms`
        })
    }
}

export default new SearchService()