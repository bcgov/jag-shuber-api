COPY(
    SELECT  aud.operation_code, aud.operation_dtm, aud.sheriff_id, shr.badge_no sheriff_badge_no, shr.first_name || ' ' || shr.last_name sheriff_name, aud.duty_id, dty.comment duty_comment, asn.title, aud.start_dtm, aud.end_dtm, aud.revision_count
    FROM (
    SELECT  'INSERT' as operation_code, created_dtm AS operation_dtm, sheriff_duty_id, sheriff_id, duty_id, start_dtm, end_dtm, created_dtm, updated_dtm, revision_count
    FROM    aud_sheriff_duty ausd
    WHERE   ausd.revision_count = 0
    UNION
    SELECT  'INSERT', created_dtm, sheriff_duty_id, sheriff_id, duty_id, start_dtm, end_dtm, created_dtm, updated_dtm, revision_count
    FROM    sheriff_duty sd
    WHERE   sd.revision_count = 0
    UNION
    SELECT  ausd_op.operation_code, ausd_op.operation_dtm, ausd_data.sheriff_duty_id, ausd_data.sheriff_id, ausd_data.duty_id, ausd_data.start_dtm, ausd_data.end_dtm, ausd_data.created_dtm, ausd_data.updated_dtm, ausd_data.revision_count
    FROM    aud_sheriff_duty ausd_op
    JOIN    aud_sheriff_duty ausd_data ON ausd_data.sheriff_duty_id = ausd_op.sheriff_duty_id AND ausd_data.revision_count = ausd_op.revision_count + 1
    WHERE   ausd_op.operation_code = 'UPDATE'
    UNION
    SELECT  ausd.operation_code, ausd.operation_dtm, sd.sheriff_duty_id, sd.sheriff_id, sd.duty_id, sd.start_dtm, sd.end_dtm, sd.created_dtm, sd.updated_dtm, sd.revision_count
    FROM    aud_sheriff_duty ausd
    JOIN    sheriff_duty sd ON sd.sheriff_duty_id = ausd.sheriff_duty_id AND sd.revision_count = ausd.revision_count + 1
    WHERE   ausd.operation_code = 'UPDATE'
    UNION
    SELECT  ausd.operation_code, ausd.operation_dtm, ausd.sheriff_duty_id, null, null, null, null, null, null, null
    FROM    aud_sheriff_duty ausd
    WHERE   ausd.operation_code = 'DELETE'
    ) aud
    LEFT OUTER JOIN    duty dty ON dty.duty_id = aud.duty_id
    LEFT OUTER JOIN    assignment asn on asn.assignment_id = dty.assignment_id
    LEFT OUTER JOIN    sheriff shr ON shr.sheriff_id = aud.sheriff_id
    ORDER BY aud.sheriff_duty_id, revision_count
) TO STDOUT WITH CSV HEADER;