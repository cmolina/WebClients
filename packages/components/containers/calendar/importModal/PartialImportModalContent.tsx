import { extractTotals } from '@proton/shared/lib/calendar/import/import';
import { c } from 'ttag';

import { CALENDAR_APP_NAME, IMPORT_CALENDAR_UNSUPPORTED_FAQ_URL } from '@proton/shared/lib/calendar/constants';
import { ImportCalendarModel } from '@proton/shared/lib/interfaces/calendar/Import';
import { Alert, AttachedFile } from '../../../components';

import ErrorDetails from './ErrorDetails';

interface Props {
    model: ImportCalendarModel;
}

const PartialImportModalContent = ({ model }: Props) => {
    const { fileAttached, visibleErrors, failure } = model;
    const { totalToImport } = extractTotals(model);
    const totalEventsDiscarded = visibleErrors.filter((e) => e.component === 'vevent').length;
    const totalEvents = totalToImport + totalEventsDiscarded;

    const learnMore = failure ? '' : IMPORT_CALENDAR_UNSUPPORTED_FAQ_URL;
    const summary =
        totalEventsDiscarded === totalEvents
            ? c('Import warning').t`No event can be imported. Expand for details.`
            : totalEventsDiscarded === 0
            ? c('Import warning').t`Part of your calendar content is not supported and will not be imported.`
            : c('Import warning')
                  .t`${totalEventsDiscarded} out of ${totalEvents} events will not be imported. Expand for details.`;

    return (
        <>
            <div>{c('Import calendar; import invitation').t`This file contains some data that we cannot import:`}</div>
            {fileAttached && <AttachedFile file={fileAttached} iconName="calendar-days" className="mb1 mt1" />}
            <Alert className="mb1" type="warning" learnMore={learnMore}>
                {c('Import calendar warning')
                    .t`${CALENDAR_APP_NAME} currently does not support certain event types, details and formats.`}
            </Alert>
            <ErrorDetails summary={summary} errors={visibleErrors} />
        </>
    );
};

export default PartialImportModalContent;
