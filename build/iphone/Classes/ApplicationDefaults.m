/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"8O95zn7LUsudxZmjejZ1oNZzD4VATM9v"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"gjoO9kRh4PAFQIMSepZdRN4qUfr6g1Qt"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"0kmLyV9kw0BQjyhBLgWbrL3v6vNEno1L"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"94u4BZ3cJ6yF1lGGIawo55PoLwjNQobD"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"9mnvJr1ZVo8ylWMBHpN82ZGvpCV5dhWg"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"BVzh4qfSCFgFamElWHWatcMgEXAO9Cn4"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end