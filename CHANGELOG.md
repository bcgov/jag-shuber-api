# Sheriff Scheduling API Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unrelease]

## [1.5.0] - 2018-09-18
### Changed
 - Added assignment id field to Shift to support auto assign feature
 - order field to Sheriff Rank Codes to support sorting by rank of sheriffs
### Added
 - New endpoint for auto assigning sheriffs to shifts
 - Common data types (`TimeType`,`DateType`,`TimeRange`)
 - Time range utils