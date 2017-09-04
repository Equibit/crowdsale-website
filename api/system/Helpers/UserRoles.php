<?php
namespace PHP_REST_API\Helpers;

/*
 * Enums for two factor
 */
abstract class UserRoles extends BasicEnum {
    const User = 1;
    const Admin = 2;
    const Manager = 3;
}
