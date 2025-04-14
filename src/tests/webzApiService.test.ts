import "reflect-metadata";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {WebzPostApiService} from "../services/webzPostApi.service";
import {PostService} from "../services/post.service";
import {container} from "tsyringe";
import {IWebzPostResponse} from "../typeDef/IWebzPostResponse";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WebzPostApiService', () => {
    let service: WebzPostApiService;
    let postServiceMock: jest.Mocked<PostService>;

    beforeEach(() => {
        postServiceMock = new PostService() as jest.Mocked<PostService>;
        postServiceMock.writeToDb = jest.fn();

        container.registerInstance(PostService, postServiceMock);

        service = container.resolve(WebzPostApiService);
    });

    test('sanitizeQueryParams should trim and remove unknown keys', () => {
        const queryParams = {
            q: '   test  ',
            sort: ' relevance ',
            order: ' asc ',
            sentiment: ' negative ',
            highlight: ' false ',
            size: ' 10 ',
            random_key: 'random_value',
        };

        const expectedParams = {
            q: 'test',
            sort: 'relevance',
            order: 'asc',
            sentiment: 'negative',
            highlight: 'false',
            size: '10',
        };

        const result = (service as any).sanitizeQueryParams(queryParams);
        expect(result).toEqual(expectedParams);
        expect(result).not.toHaveProperty('random_key');
    });

    test('prepareNextUrl should build correct next URL', () => {
        const mockResponse = getMockResponseJson();
        const responseDto = mockResponse as IWebzPostResponse;

        const result = (service as any).prepareNextUrl(responseDto);

        const expectedNextUrl = 'https://api.webz.io/newsApiLite?token=test-token&ts=1744350915425&q=random&sort=relevancy&order=desc&from=10&ns=40.811604&ni=81533ca53452eb2ec66e9d27c5d4a293df3bb5ff&sentiment=negative&highlight=true&size=10';

        expect(result).toBe(expectedNextUrl);
    });

    test('handleFailCase should throw exception on 500', () => {
        const mockResponse = {
            status: 500,
            data: 'Internal Server Error',
        };

        expect(() => {
            (service as any).handleFailCase(mockResponse);
        }).toThrow('API request failed with status: 500');
    });

    test('shouldContinueFetching returns true when retrieved < available', () => {
        expect((service as any).shouldContinueFetching(10, 5)).toBe(true);
    });

    test('shouldContinueFetchingMore returns false when retrieved == available', () => {
        expect((service as any).shouldContinueFetching(10, 10)).toBe(false);
    });

    test('shouldContinueFetchingMore returns false when retrieved > available', () => {
        expect((service as any).shouldContinueFetching(10, 11)).toBe(false);
    });

    test('shouldWriteToDb returns true for 200 items', () => {
        const batch = Array(200).fill('val');
        expect((service as any).shouldWriteToDb(batch)).toBe(true);
    });

    test('shouldWriteToDb returns false for <200 items', () => {
        const batch = Array(99).fill('val');

        expect((service as any).shouldWriteToDb(batch)).toBe(false);
    });

    test('fetchPosts should not crash', async () => {
        mockedAxios.get.mockResolvedValue({
            status: 200,
            data: getMockResponseJson(),
        });

        const queryParams = {
            q: 'test query',
            sort: 'relevance',
            order: 'desc',
            sentiment: 'positive',
            highlight: 'true',
            size: '10',
        };

        await expect(service.fetchPosts(queryParams)).resolves.not.toThrow();
    });
});

function getMockResponseJson() {
    const filePath = path.resolve('./src/tests/__fixtures__/responseJson.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
