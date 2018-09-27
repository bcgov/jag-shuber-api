# Sheriff Scheduling API Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2018-09-??

### Deprecated
- `deleteAssignment` in favour of `expireAssignment`
- `deleteDutyRecurrence` in favour of `expireDutyRecurrence`

### Removed
- `models/Courthouse.location` has been removed as it was not being used

### Changed

#### API Client
| Original | New |
|:---|:---|
|`GetCourthouses` | `GetLocations`|
|`CreateCourthouse` | `CreateLocation` |
|`GetCourthouseById` | `GetLocationById`|
|`UpdateCourthouse` | `UpdateLocation` |
|`DeleteCourthouse` | `DeleteLocation` |
|`GetRuns`  | `GetEscortRuns`|
|`CreateRun`  | `CreateEscortRun`|
|`GetRunById`  | `GetEscortRunById`|
|`UpdateRun`  | `UpdateEscortRun`|
|`DeleteRun`  | `DeleteEscortRun`|

#### Models
| Original | New |
|:---|:---|
| `Courthouse` | `Location` |
| `Courthouse.parentCourthouseId` | `Location.parentLocationId`  |
| `Assignment.courthouseId` | `Assignment.locationId`  |
| `Assignment.runId` | `Assignment.escortRunId`  |
| `Sheriff.homeCourthouseId` | `Sheriff.homeLocationId`  |
| `Sheriff.currentCourthouseId` | `Sheriff.currentLocationId`  |
| `Courtroom.courthouseId` | `Courtroom.locationId`  |
| `Run` | `EscortRun` |
| `Run.courthouseId` | `EscortRun.locationId` |
| `Shift.courthouseId` | `Shift.locationId` |
| `ShiftCopyOptions.courthouseId` | `ShiftCopyOptions.locationId` |
| `DutyImportDefaultsRequest.courthouseId` | `DutyImportDefaultsRequest.locationId` |
| `SheriffDutyAutoAssignRequest.courthouseId` | `SheriffDutyAutoAssignRequest.locationId` |

#### API

|Type | Original | New |
|:---|:---|:---|
| Service | `CourthouseService` | `LocationService` |
| Controller |`CourthouseController` | `LocationController` |
| Endpoint | `/courthouses` | `/locations` |

> Model Changes described above apply to both the client and backend of the API


## [1.5.0] - 2018-09-18
### Changed
 - Added assignment id field to Shift to support auto assign feature
 - order field to Sheriff Rank Codes to support sorting by rank of sheriffs
### Added
 - New endpoint for auto assigning sheriffs to shifts
 - Common data types (`TimeType`,`DateType`,`TimeRange`)
 - Time range utils