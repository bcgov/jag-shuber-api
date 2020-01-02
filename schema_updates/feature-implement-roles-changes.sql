-- changes to table: [api_scope]
ALTER TABLE shersched.api_scope DROP COLUMN api_scope_string;
ALTER TABLE shersched.api_scope DROP COLUMN read_only_ind;
ALTER TABLE shersched.api_scope ADD scope_name varchar(128) NOT NULL AFTER api_scope_id;
ALTER TABLE shersched.api_scope ADD scope_code varchar(128) NOT NULL AFTER scope_name;
ALTER TABLE shersched.api_scope ADD system_scope_ind boolean NOT NULL DEFAULT false AFTER scope_code;

-- changes to table: [app_role]
ALTER TABLE shersched.app_role ALTER COLUMN app_role_name varchar(128) NOT NULL;
ALTER TABLE shersched.app_role ADD COLUMN app_role_code varchar(128) NOT NULL;

-- new table: [frontend_scope]
CREATE TABLE IF NOT EXISTS shersched.frontend_scope (
    frontend_scope_id uuid NOT NULL,
	scope_name varchar(128) NOT NULL,
	scope_code varchar(128) NOT NULL,
	system_scope_ind bool NOT NULL DEFAULT false,
	description varchar(200) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_frontend_scope PRIMARY KEY (frontend_scope_id)
);

ALTER TABLE shersched.frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE shersched.frontend_scope TO shersched;
GRANT ALL ON TABLE frontend_scope TO postgres;

-- new table: [frontend_scope_permission]
CREATE TABLE IF NOT EXISTS shersched.frontend_scope_permission (
    frontend_scope_permission_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	display_name varchar(128) NOT NULL,
	permission_code varchar(128) NOT NULL,
	description varchar(200) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_frontend_scope_permission PRIMARY KEY (frontend_scope_permission_id),
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES shersched.frontend_scope(frontend_scope_id)
);

ALTER TABLE shersched.frontend_scope_permission OWNER TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO postgres;

-- drop and recreate constraints for table: [app_role_api_scope]
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT pk_aprlapsc;
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT fk_aprlapsc_aprl;
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT fk_aprlapsc_apsc;

ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT pk_app_role_api_scope PRIMARY KEY (app_role_api_scope_id);
ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id);
ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES shersched.api_scope(api_scope_id);

-- new table: [app_role_frontend_scope]
CREATE TABLE IF NOT EXISTS shersched.app_role_frontend_scope (
    app_role_frontend_scope_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_frontend_scope PRIMARY KEY (app_role_frontend_scope_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES shersched.frontend_scope(frontend_scope_id)
);

ALTER TABLE shersched.app_role_frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO postgres;

-- new table: [app_role_permission]
CREATE TABLE IF NOT EXISTS shersched.app_role_permission (
    app_role_permission_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	app_role_frontend_scope_id uuid NULL,
	app_role_api_scope_id uuid NULL,
	frontend_scope_permission_id uuid NULL,
	api_scope_permission_id uuid NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_permission PRIMARY KEY (app_role_permission_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_app_role_frontend_scope FOREIGN KEY (app_role_frontend_scope_id) REFERENCES shersched.app_role_frontend_scope(app_role_frontend_scope_id),
    CONSTRAINT fk_app_role_api_scope FOREIGN KEY (app_role_api_scope_id) REFERENCES shersched.app_role_api_scope(app_role_api_scope_id),
    CONSTRAINT fk_frontend_permission_id FOREIGN KEY (frontend_scope_permission_id) REFERENCES shersched.frontend_scope_permission(frontend_scope_permission_id)
);

ALTER TABLE shersched.app_role_permission OWNER TO shersched;
GRANT ALL ON TABLE app_role_permission TO shersched;
GRANT ALL ON TABLE app_role_permission TO postgres;

-- Insert api scopes
INSERT INTO shersched.api_scope (api_scope_id,scope_name,scope_code,system_scope_ind,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('65f90a7e-b242-4206-adf5-f0a16010d8b6','Admin Sheriff Leaves','admin:sheriff:leaves',false,'Admin Sheriff Leaves','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('8a60b4ac-829a-461c-a92c-750b13112860','Admin User Roles','admin:user:roles',false,'Admin Roles & Permissions','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('90e4cafd-222e-46c9-803c-b8a4334be242','Admin Sheriff Locations','admin:sheriff:locations',false,'Admin Sheriff Locations','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('3d0ce31c-248f-4b5d-ac21-211d2f703a2c','Admin Sheriff Training','admin:sheriff:training',false,'Admin Sheriff Training','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('0d906406-5aa6-4247-a849-4f77fef768aa','Add Sheriffs','sheriffs:add',false,'Add Sheriffs','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('eaf442d6-3a23-4791-9f0a-294ad6ae7295','Deactivate Sheriffs','sheriffs:deactivate',false,'Deactivate Sheriffs','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('c94cbbe7-d61b-44c2-9a33-5e20d89f5cce','Edit Sheriffs','sheriffs:edit',false,'Edit Sheriffs','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('30d56897-03a9-442c-b659-3295dbddbaba','View + Search Sheriffs','sheriffs:view',false,'View + Search Sheriffs','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('8b340837-31ff-4329-966b-23e2de5d4225','System Locations','system:locations',false,'System Locations','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('4adcb7f5-e243-473f-8a88-0d235ea2370c','System Assignment Types','system:types:assignments',false,'System Assignment Types','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
;
INSERT INTO shersched.api_scope (api_scope_id,scope_name,scope_code,system_scope_ind,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('3a5e0468-3f61-45b9-b5c1-9035c8d78225','System Leave Types','system:types:leaves',false,'System Leave Types','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('9eaae911-d8ba-41ac-8a70-5c5d97538fac','Admin Users','admin:users',false,'Admin Users','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('b57d11bf-a40b-4fbf-8c36-996f836ff282','Delete Sheriffs','sheriffs:delete',false,'Delete Sheriffs','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('0771e3e7-00b3-4ee0-be06-ab525e0381ac','System API Scopes','system:scopes:api',false,'System API Scopes','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('73ef27ee-80c1-4e16-a967-91bb2a57571f','System UI Components','system:scopes:ui',false,'System UI Components','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
,('970e832a-6f18-40b7-a59a-786f577ce943','System Training Types','system:types:training',false,'System Training Types','DEV - FRONTEND','DEV - FRONTEND','2019-12-28 23:54:00.385','2019-12-28 23:54:00.385',0)
;

-- Insert frontend scopes
INSERT INTO shersched.frontend_scope (frontend_scope_id,scope_name,scope_code,system_scope_ind,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('cf35acb6-f21c-4a8b-9261-c48df69056a6','Sheriff Profile Roles Plugin','SHERIFF_PROFILE_PLUGIN_ROLES',false,'Sheriff Profile Roles Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('f15477c8-8e1f-4216-bb7a-0d65e5dd5846','Sheriff Profile Training Plugin','SHERIFF_PROFILE_PLUGIN_TRAINING',false,'Sheriff Profile Training Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('50ffced2-7a05-4672-96d0-f05d474c6d1e','Sheriff Profile Leaves Plugin','SHERIFF_PROFILE_PLUGIN_LEAVES',false,'Sheriff Profile Leaves Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('18e73e5a-ffbf-4797-b478-0f02ac236e78','Admin Frontend Scopes Plugin','ADMIN_PLUGIN_FRONTEND_SCOPES',false,'Admin Frontend Scopes Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','Admin API Scopes Plugin','ADMIN_PLUGIN_API_SCOPES',false,'Admin API Scopes Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('675d16bb-6661-4929-94a7-0bd24dd2e2a6','Admin Locations Plugin','ADMIN_PLUGIN_LOCATIONS',false,'Admin Locations Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Admin Leave Types Plugin','ADMIN_PLUGIN_LEAVE_TYPES',false,'Admin Leave Types Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Admin Roles Plugin','ADMIN_PLUGIN_ROLES',false,'Admin Roles Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('f15cf10f-f115-40ea-83eb-f34cad863ad8','Admin User Roles Plugin','ADMIN_PLUGIN_USER_ROLES',false,'Admin User Roles Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('a5affaa4-f1dc-4336-ab14-b02e3b47f379','Admin Users Page','ADMIN_PAGE_USERS',false,'Admin Users & Sheriffs Page','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('cecf48f0-fa9f-427c-b3c8-040aaa1044a0','Sheriff Profile Identification Plugin','SHERIFF_PROFILE_PLUGIN_IDENT',false,'Sheriff Profile Identification Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('2d969b8e-7caf-46ea-83f8-ab04af7b7547','Admin Courtrooms Plugin','ADMIN_PLUGIN_COURTROOMS',false,'Admin Courtrooms Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('9a4c966e-852c-47a2-b58a-ef2e9f826a57','Admin Training Types Plugin','ADMIN_PLUGIN_TRAINING_TYPES',false,'Admin Training Types Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('27899ec1-41cc-4d54-ba89-43d1118f9e7f','Sheriff Profile Location Plugin','SHERIFF_PROFILE_PLUGIN_LOCATION',false,'Sheriff Profile Location Plugin','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
;

-- Insert permissions
INSERT INTO shersched.frontend_scope_permission (frontend_scope_permission_id,frontend_scope_id,display_name,permission_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('395c3f1e-6c6f-4d28-8537-74e2dc187714','a5affaa4-f1dc-4336-ab14-b02e3b47f379','Delete Users','DELETE_USERS','Delete Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('1f1aa180-53e9-40ae-a4ad-566367b403cd','a5affaa4-f1dc-4336-ab14-b02e3b47f379','View Users','VIEW_USERS','View Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.557',0)
,('a20a2836-b224-474d-87fc-4f38e936707f','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','View Roles','VIEW_ROLES','View Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('0c03ff6e-7825-42c2-a1b9-46c46c685eae','9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','Edit Scopes','EDIT_BE_SCOPES','Edit Backend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('b9d6e7f2-e556-440f-b732-5137189db5e4','18e73e5a-ffbf-4797-b478-0f02ac236e78','Delete Scopes','DELETE_FE_SCOPES','Delete Frontend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('f78f3f58-0155-418b-b574-8e7c482bd9ee','9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','View Scopes','VIEW_BE_SCOPES','View Backend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('7c99b15f-d88d-4200-8bce-31cb154ceff4','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Edit Roles','EDIT_ROLES','Edit Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('b7abeda0-550c-463b-9371-3f158ac4ab12','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Edit Leave Types','EDIT_LEAVE_TYPES','Edit Leave Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('96c39829-2df0-4fb1-a6ba-d4fc73150580','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','View Training Types','VIEW_TRAINING_TYPES','View Training Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('d0a656de-4b29-44c4-8cd9-8347839fac74','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Delete Leave Types','DELETE_LEAVE_TYPES','Delete Leave Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
;
INSERT INTO shersched.frontend_scope_permission (frontend_scope_permission_id,frontend_scope_id,display_name,permission_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('42a3e7ed-c505-467c-9c22-4c8494a13b47','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Create Leave Types','CREATE_LEAVE_TYPES','Create Leave Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('d2a36ab5-09e5-491b-90df-6cd46326612f','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Create Training Types','CREATE_TRAINING_TYPES','Create Training Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('e6ef789c-df34-48cd-bf77-964f30b9dc27','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Deactivate Leave Types','DEACTIVATE_LEAVE_TYPES','Deactivate Leave Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('e0626f49-9e56-4995-89a5-a670d53dd695','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Edit Training Types','EDIT_TRAINING_TYPES','Edit Training Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('2984ec35-ca02-41aa-b504-d158a78b2b25','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Delete Training Types','DELETE_TRAINING_TYPES','Delete Training Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('8844ef61-a684-465f-b161-ab45e259baa4','2d969b8e-7caf-46ea-83f8-ab04af7b7547','View Courtrooms','VIEW_COURTROOMS','View Courtrooms','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('45de9a7a-dc30-48d2-a1c5-349090d9ac4d','2d969b8e-7caf-46ea-83f8-ab04af7b7547','Deactivate Courtrooms','DEACTIVATE_COURTROOMS','Deactivate Courtrooms','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('5ba81cac-3802-4bd0-9d89-e5d30cb61048','675d16bb-6661-4929-94a7-0bd24dd2e2a6','Delete Locations','DELETE_LOCATIONS','Delete Locations','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('168f6cf3-b71f-4c5e-a028-a23355de44c4','675d16bb-6661-4929-94a7-0bd24dd2e2a6','View Locations','VIEW_LOCATIONS','View Locations','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('b0714329-4bb9-4d53-91ab-e7f592df85b4','2d969b8e-7caf-46ea-83f8-ab04af7b7547','Edit Courtrooms','EDIT_COURTROOMS','Edit Courtrooms','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
;
INSERT INTO shersched.frontend_scope_permission (frontend_scope_permission_id,frontend_scope_id,display_name,permission_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('9cb296a2-67a7-43f8-b03d-9cf20623caa0','675d16bb-6661-4929-94a7-0bd24dd2e2a6','Edit Locations','EDIT_LOCATIONS','Edit Locations','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('2d1db74b-d2ed-490c-8d87-0660da33df60','a5affaa4-f1dc-4336-ab14-b02e3b47f379','Search Users','SEARCH_USERS','Search Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('4f95b2f9-3421-473b-a726-2e081c05c810','a5affaa4-f1dc-4336-ab14-b02e3b47f379','Create Users','CREATE_USERS','Create Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('89417334-9cf0-4e85-9b9a-fa60bf3e258e','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Create Roles','CREATE_ROLES','Create Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('d47fff0f-5abf-41d9-8b20-64cd4ca26665','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Delete Roles','DELETE_ROLES','Delete Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('6fc10552-de74-4d9f-9331-312cee8c8ecf','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Assign Roles','ASSIGN_ROLES','Assign Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('6500a1d6-b788-4d36-aa45-8359b4618eeb','18e73e5a-ffbf-4797-b478-0f02ac236e78','Create Scopes','CREATE_FE_SCOPES','Create Frontend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('9ca55e13-6f49-464c-8705-f7758db6eb41','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','Deactivate Training Types','DEACTIVATE_TRAINING_TYPES','Deactivate Training Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('72f1432c-7868-4e48-845a-48f1f95efa0c','2d969b8e-7caf-46ea-83f8-ab04af7b7547','Create Courtrooms','CREATE_COURTROOMS','Create Courtrooms','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('0e1ba906-4209-4932-87ce-4e97e190ef67','675d16bb-6661-4929-94a7-0bd24dd2e2a6','Deactivate Locations','DEACTIVATE_LOCATIONS','Deactivate Locations','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
;
INSERT INTO shersched.frontend_scope_permission (frontend_scope_permission_id,frontend_scope_id,display_name,permission_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('b57ae7a2-4924-4fdf-b46a-0b04de2d8891','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','View Leave Types','VIEW_LEAVE_TYPES','View Leave Types','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('7f599adc-93a7-4d0c-9d8a-5ae5684e13da','cf35acb6-f21c-4a8b-9261-c48df69056a6','View Profile Roles','VIEW_USER_ROLES','View Sheriff Profile User Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('d7599834-97be-4279-aa70-96e77715dcde','a5affaa4-f1dc-4336-ab14-b02e3b47f379','Edit Users','EDIT_USERS','Edit Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
,('1f912f11-c710-4021-9fc1-02b9a3dcefdb','9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','Delete Scopes','DELETE_BE_SCOPES','Delete Backend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('1b1eac11-a4aa-4448-82ce-55da070443c4','9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','Create Scopes','CREATE_BE_SCOPES','Create Backend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('35a3c536-5931-4ca2-be71-041dd5367c3a','18e73e5a-ffbf-4797-b478-0f02ac236e78','View Scopes','VIEW_FE_SCOPES','View Frontend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('2de73df9-9d41-45b9-b014-e0b0d1387053','2d969b8e-7caf-46ea-83f8-ab04af7b7547','Delete Courtrooms','DELETE_COURTROOMS','Delete Courtrooms','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('0cca1c00-5d5a-4fa5-aa61-20e0d42c1a9e','675d16bb-6661-4929-94a7-0bd24dd2e2a6','Create Locations','CREATE_LOCATIONS','Create Locations','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('c5635b91-da8d-4491-b62d-0e2f52db94a3','cf35acb6-f21c-4a8b-9261-c48df69056a6','Assign User Roles','ASSIGN_USER_ROLES','Assign Sheriff Profile User Roles','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
,('1a8dd13d-747d-4b64-ae93-81d984cf0f5f','a5affaa4-f1dc-4336-ab14-b02e3b47f379','Deactivate Users','DEACTIVATE_USERS','Deactivate Users','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.556','2020-01-01 23:56:28.556',0)
;
INSERT INTO shersched.frontend_scope_permission (frontend_scope_permission_id,frontend_scope_id,display_name,permission_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('a27601ac-9a2d-44dd-9588-f9592aca7078','18e73e5a-ffbf-4797-b478-0f02ac236e78','Edit Scopes','EDIT_FE_SCOPES','Edit Frontend Scopes','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 23:56:28.557','2020-01-01 23:56:28.557',0)
;
-- Done with permissions

-- Seed initial users and roles data
INSERT INTO shersched.app_user (app_user_id,siteminder_id,user_auth_id,display_name,system_account_ind,default_location_id,created_by,sheriff_id,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('d9772aab-6e5e-4b41-87b2-3294009e6d28',NULL,NULL,'Test User',0,'65b2e8fb-0d64-4f63-853c-76d8d359760e','anon$shersched',NULL,'anon$shersched','2019-12-02 00:04:40.757','2019-12-02 00:04:40.757',0)
,('c99d86ef-1ba0-404b-86f9-ea7043e872a9',NULL,NULL,'Iain Bell',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','90b48bc8-5cc2-48f3-8b28-d7121298a449','DEV - BACKEND','2019-12-19 15:49:53.076','2019-12-19 15:49:53.076',0)
,('273ef26f-5cca-4ae6-988e-2f7eda240bd4',NULL,NULL,'Ryan Waldriff',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','ce34e8ce-71f5-4190-b53a-c9eb4ef20044','DEV - BACKEND','2019-12-19 15:49:53.085','2019-12-19 15:49:53.085',0)
,('3a8ac996-582c-4e5f-ae74-e79c640effe7',NULL,NULL,'Tu Green',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','4b7dde9d-a59e-4ef2-bfd5-9ccbe60af1bc','DEV - BACKEND','2019-12-19 15:49:53.081','2019-12-19 15:49:53.081',0)
,('90c39c61-4777-4864-899c-c237e06d1e24',NULL,NULL,'Arnie Vandenberg',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','16d0b544-976a-4e96-b7aa-7bb5d6721d50','DEV - BACKEND','2019-12-19 15:49:53.095','2019-12-19 15:49:53.095',0)
,('40175dbe-941f-4d0c-a8de-181fa533c719',NULL,NULL,'Keith Sly',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','ad68ce9a-2e50-4c67-aa62-e95c3dfc16e5','DEV - BACKEND','2019-12-19 15:49:53.107','2019-12-19 15:49:53.107',0)
,('4bc756e9-f8df-4d6a-9f0f-22a14194fe5d',NULL,NULL,'Rob Booth',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','dbe198c4-667a-4f02-8133-ce9de0c49a90','DEV - BACKEND','2019-12-19 15:49:53.110','2019-12-19 15:49:53.110',0)
,('b1898d19-a3ea-4f05-9491-6ef8c7b21cdd',NULL,NULL,'Raquel Kampuis',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','89648cf9-b551-4c48-97c3-b680cc5cfd8c','DEV - BACKEND','2019-12-19 15:49:53.113','2019-12-19 15:49:53.113',0)
,('30ac8481-7618-47d7-b00a-026f375fdbb0',NULL,NULL,'Chuck Macintosh',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','3578bd44-8964-45d8-b3d8-3b74dd337e95','DEV - BACKEND','2019-12-19 15:49:53.129','2019-12-19 15:49:53.129',0)
,('05e5c445-ca1b-4862-9cc7-74814cbb66aa',NULL,NULL,'Theron Watson',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','ceabe645-42f6-408b-9ddd-30c5eee93dce','DEV - BACKEND','2019-12-19 15:49:53.133','2019-12-19 15:49:53.133',0)
,('98b68d6e-b2e1-438c-be52-1f1a6dac07ee',NULL,NULL,'Jim Vinnedge',0,'065b6767-097d-4a53-bcd9-6ad026fd4562','DEV - BACKEND','2af8f5d3-aadd-42ad-ba90-6d23aa65b234','DEV - BACKEND','2019-12-19 15:49:53.136','2019-12-19 15:49:53.136',0)
;

INSERT INTO shersched.app_role (app_role_id,app_role_name,description,created_by,updated_by,created_dtm,updated_dtm,revision_count,app_role_code) VALUES 
('f3ef9710-4c53-41b4-8e9a-31f988a0e74b','Developer','Developer','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 20:18:22.860','2020-01-01 20:18:22.860',0,'DEVELOPER')
,('3bbdae43-0ba5-4430-babb-b4875e637e24','System','System User Type','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 20:18:22.860','2020-01-01 20:18:22.860',0,'SYSTEM')
,('2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','Sheriff','Sheriff User Type','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 20:18:22.860','2020-01-01 20:18:22.860',0,'SHERIFF')
,('80294c81-cad7-4e58-ace1-76587d36530e','Administrator','Admin User Type','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 20:18:22.860','2020-01-01 20:18:22.860',0,'ADMIN')
;

INSERT INTO shersched.app_user_role (app_user_role_id,app_user_id,app_role_id,effective_date,expiry_date,location_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('f17b1a70-458a-4587-b7e3-914f2cc25050','273ef26f-5cca-4ae6-988e-2f7eda240bd4','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('2cb595c0-7d3f-42f6-815c-8d351debb679','40175dbe-941f-4d0c-a8de-181fa533c719','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('fce46cf5-2dcc-4cd1-a1a7-256d4ccbd28d','4bc756e9-f8df-4d6a-9f0f-22a14194fe5d','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('453ca35a-51ab-4c9d-9a5c-14072b9708be','b1898d19-a3ea-4f05-9491-6ef8c7b21cdd','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('055fd587-b661-440a-9b79-d52a0ca8936b','30ac8481-7618-47d7-b00a-026f375fdbb0','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('9bd5aa8e-2cfe-433d-98e5-a1ab80bc467c','05e5c445-ca1b-4862-9cc7-74814cbb66aa','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('f7720eb1-af75-4dc5-b1a0-351609baa021','98b68d6e-b2e1-438c-be52-1f1a6dac07ee','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('51218553-5d6f-495f-bb8d-8416880bbbfa','d9772aab-6e5e-4b41-87b2-3294009e6d28','f3ef9710-4c53-41b4-8e9a-31f988a0e74b','2020-01-01',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('ac619055-b3c8-4a15-a5ea-93892debbdc6','d9772aab-6e5e-4b41-87b2-3294009e6d28','80294c81-cad7-4e58-ace1-76587d36530e','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('163827bb-827c-4fb0-a1b6-2f770c85a02f','d9772aab-6e5e-4b41-87b2-3294009e6d28','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('ddfe7d64-a921-4543-9f49-5cdb6783e2ed','d9772aab-6e5e-4b41-87b2-3294009e6d28','3bbdae43-0ba5-4430-babb-b4875e637e24','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('31c7fc07-c66e-4c47-8e0a-1e0de607b209','3a8ac996-582c-4e5f-ae74-e79c640effe7','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('f47bcde3-2527-469d-a21b-7ee5a13ce1df','90c39c61-4777-4864-899c-c237e06d1e24','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
,('1980d3df-e320-466b-8baa-19a083586533','c99d86ef-1ba0-404b-86f9-ea7043e872a9','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-29',NULL,NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:52:42.798','2020-01-01 21:52:42.798',0)
;

INSERT INTO shersched.app_role_frontend_scope (app_role_frontend_scope_id,app_role_id,frontend_scope_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('3275a9d0-8779-426a-a83b-084b18059355','f3ef9710-4c53-41b4-8e9a-31f988a0e74b','18e73e5a-ffbf-4797-b478-0f02ac236e78','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6','80294c81-cad7-4e58-ace1-76587d36530e','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('68856336-a28e-4afe-bfeb-a4a09f049a89','80294c81-cad7-4e58-ace1-76587d36530e','f15cf10f-f115-40ea-83eb-f34cad863ad8','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('703622e3-0521-42c7-859c-9f14abedc43f','3bbdae43-0ba5-4430-babb-b4875e637e24','2d969b8e-7caf-46ea-83f8-ab04af7b7547','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('71785ca6-1993-4b3e-a1a7-05f4c225ad25','3bbdae43-0ba5-4430-babb-b4875e637e24','9a4c966e-852c-47a2-b58a-ef2e9f826a57','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('039af66d-442a-4de2-b7d7-5f945de52ba8','3bbdae43-0ba5-4430-babb-b4875e637e24','7b5bae9a-e43f-43c1-9550-c01e2f3c9dcc','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('2c6c760e-bdad-4d27-872d-963c1451927b','3bbdae43-0ba5-4430-babb-b4875e637e24','675d16bb-6661-4929-94a7-0bd24dd2e2a6','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('6d831f45-bae4-433b-908b-28ff3fc446f2','f3ef9710-4c53-41b4-8e9a-31f988a0e74b','9373d5bb-b2ac-4e26-bf0d-cf78f3da7d75','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('0130dccc-269f-469f-bdd1-ee3a8548c921','80294c81-cad7-4e58-ace1-76587d36530e','a5affaa4-f1dc-4336-ab14-b02e3b47f379','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.208','2020-01-01 21:48:01.208',0)
,('c2af9731-5264-4389-9f36-5f83f9872f8d','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','cecf48f0-fa9f-427c-b3c8-040aaa1044a0','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.209','2020-01-01 21:48:01.209',0)
,('97e5725f-f34d-4f15-b54a-cefb38168fc2','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','50ffced2-7a05-4672-96d0-f05d474c6d1e','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.209','2020-01-01 21:48:01.209',0)
,('223a1699-d572-48ae-8a8f-b9e172d535f1','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','cf35acb6-f21c-4a8b-9261-c48df69056a6','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.209','2020-01-01 21:48:01.209',0)
,('0e179a22-8f9c-4ff8-a465-7d93c8a85328','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','27899ec1-41cc-4d54-ba89-43d1118f9e7f','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.209','2020-01-01 21:48:01.209',0)
,('080467de-6f7a-48a2-a41f-189223b347b9','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','f15477c8-8e1f-4216-bb7a-0d65e5dd5846','DEV - FRONTEND','DEV - FRONTEND','2020-01-01 21:48:01.209','2020-01-01 21:48:01.209',0)
;

INSERT INTO shersched.app_role_permission (app_role_permission_id,app_role_id,app_role_frontend_scope_id,app_role_api_scope_id,frontend_scope_permission_id,api_scope_permission_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES 
('308f44c9-83c0-44c2-b60f-340b34583c73','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'4f95b2f9-3421-473b-a726-2e081c05c810',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('b50f88c1-c1d9-45ed-956b-f31978acec72','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'1f1aa180-53e9-40ae-a4ad-566367b403cd',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:21:44.464','2020-01-02 00:21:44.464',0)
,('6a46f308-e63e-43bf-91a1-77daf0eb077d','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'1f1aa180-53e9-40ae-a4ad-566367b403cd',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:22:55.586','2020-01-02 00:22:55.586',0)
,('52a23c79-35c7-4b7d-a50f-6d6bf229907f','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'4f95b2f9-3421-473b-a726-2e081c05c810',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:22:55.586','2020-01-02 00:22:55.586',0)
,('6f13beb6-c4c0-4a24-85b5-4456ca34c09c','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'d7599834-97be-4279-aa70-96e77715dcde',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:22:55.586','2020-01-02 00:22:55.586',0)
,('4659a48a-c880-415d-85dc-58ec93c0dacb','80294c81-cad7-4e58-ace1-76587d36530e','b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6',NULL,'a20a2836-b224-474d-87fc-4f38e936707f',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('8b488235-a720-45be-b44a-4cd612a618e5','80294c81-cad7-4e58-ace1-76587d36530e','b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6',NULL,'89417334-9cf0-4e85-9b9a-fa60bf3e258e',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('2fa20a0c-e2cc-455c-b55e-724769279793','80294c81-cad7-4e58-ace1-76587d36530e','b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6',NULL,'6fc10552-de74-4d9f-9331-312cee8c8ecf',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('52b250f9-1199-4c77-bd19-229875933038','80294c81-cad7-4e58-ace1-76587d36530e','b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6',NULL,'7c99b15f-d88d-4200-8bce-31cb154ceff4',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('08b51425-348f-4105-9d24-3d417e41ad4c','80294c81-cad7-4e58-ace1-76587d36530e','b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6',NULL,'d47fff0f-5abf-41d9-8b20-64cd4ca26665',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('8c8fa8e0-f543-45a3-9d40-b1eb992dd8fc','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'2d1db74b-d2ed-490c-8d87-0660da33df60',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('b14f4b08-76c6-4be1-929a-0953750b4db1','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'395c3f1e-6c6f-4d28-8537-74e2dc187714',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('ba818c6f-ec5e-43fb-8016-1f9d032d1ee8','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'1f1aa180-53e9-40ae-a4ad-566367b403cd',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('c8466027-8562-4eff-a870-d8a538618914','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'d7599834-97be-4279-aa70-96e77715dcde',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
,('db7334cf-a9b9-4cf2-a439-c7737414dbb3','80294c81-cad7-4e58-ace1-76587d36530e','0130dccc-269f-469f-bdd1-ee3a8548c921',NULL,'1a8dd13d-747d-4b64-ae93-81d984cf0f5f',NULL,'DEV - FRONTEND','DEV - FRONTEND','2020-01-02 00:23:38.507','2020-01-02 00:23:38.507',0)
;