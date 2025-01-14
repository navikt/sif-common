import { delay, http, HttpResponse } from 'msw';
import { søker1Mock } from '../mocks/soker1';
import { deltakelserIkkeSøkt } from '../mocks/soker1/deltakelser/ikkeSøkt';
import { deltakelserHarSøkt } from '../mocks/soker1/deltakelser/harSøkt';

const MellomlagringStorageKey = 'mellomlagring-ungdomsytelse-deltaker-soknad';

export const handlers = [
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(søker1Mock.søker);
    }),
    http.get('**/oppslag/barn', () => {
        return HttpResponse.json(søker1Mock.barn);
    }),
    http.get('**/oppslag/arbeidsgiver', () => {
        return HttpResponse.json(søker1Mock.arbeidsgiver);
    }),
    http.post('**/soknad/innsending', () => {
        return HttpResponse.json({});
    }),
    http.get('**/deltakelse/register/hent/alle', () => {
        const harSøkt = false;
        return HttpResponse.json(harSøkt ? deltakelserHarSøkt : deltakelserIkkeSøkt);
    }),
    http.get('**/person/personopplysninger-api/personalia', () => {
        return HttpResponse.json(søker1Mock.personalia);
    }),
    http.get(`**/mellomlagring/UNGDOMSYTELSE_DELTAKER_SOKNAD`, async () => {
        const data = localStorage.getItem(MellomlagringStorageKey);
        const jsonData = JSON.parse(JSON.stringify(data) || '{}');
        await delay(350);
        return new HttpResponse(jsonData, { status: 200 });
    }),
    http.post(`**/mellomlagring/UNGDOMSYTELSE_DELTAKER_SOKNAD`, async ({ request }) => {
        const data = await request.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return new HttpResponse(null, { status: 200 });
    }),
    http.put(`**/mellomlagring/UNGDOMSYTELSE_DELTAKER_SOKNAD`, async ({ request }) => {
        const data = await request.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return new HttpResponse(null, { status: 200 });
    }),
    http.delete(`**/mellomlagring/UNGDOMSYTELSE_DELTAKER_SOKNAD`, () => {
        localStorage.setItem(MellomlagringStorageKey, '');
        return new HttpResponse(null, { status: 200 });
    }),
];
