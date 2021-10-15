import { AuthenticationMethod, ImportType, LaunchImportPayload, OAuthProps } from '../interfaces/EasySwitch';

export const createToken = (data: OAuthProps) => ({
    url: 'importer/v1/tokens',
    method: 'post',
    data,
});

export const createImportMail = (data: {
    TokenID: string;
    ImapHost: string;
    ImapPort: number;
    Sasl: AuthenticationMethod;
}) => ({
    url: 'importer/v1/mail/importers',
    method: 'post',
    data,
});

export const createImportCalendar = (TokenID: string) => ({
    url: 'importer/v1/calendar/importers',
    method: 'post',
    data: {
        TokenID,
    },
});

export const createImportContacts = (TokenID: string) => ({
    url: 'importer/v1/contacts/importers',
    method: 'post',
    data: {
        TokenID,
    },
});

export const startImportTask = (data: LaunchImportPayload) => ({
    url: 'importer/v1/importers/start',
    method: 'post',
    data,
});

export const getImportsList = () => ({
    url: 'importer/v1/importers',
    method: 'get',
});

export const getImportReportsList = () => ({
    url: 'importer/v1/reports',
    method: 'get',
});

export const deleteImportReport = (reportID: string, importType?: ImportType) => {
    let url = `mail/v4/importers/reports/${reportID}`; // default uses legacy

    if (importType === ImportType.MAIL) {
        url = `importer/v1/mail/importers/reports/${reportID}`;
    }
    if (importType === ImportType.CALENDAR) {
        url = `importer/v1/calendar/importers/reports/${reportID}`;
    }
    if (importType === ImportType.CONTACTS) {
        url = `importer/v1/contacts/importers/reports/${reportID}`;
    }

    return {
        url,
        method: 'delete',
    };
};

export const cancelImport = (data: { ImporterID: string; Products: ImportType[] }) => ({
    url: 'importer/v1/importers/cancel',
    method: 'put',
    data,
});

export const resumeImport = (data: { ImporterID: string; Products: ImportType[] }) => ({
    url: 'importer/v1/importers/resume',
    method: 'put',
    data,
});