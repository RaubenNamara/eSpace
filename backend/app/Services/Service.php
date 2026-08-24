<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Base Service Class
 * 
 * Provides the foundation for business logic services.
 * Services coordinate between repositories and handle complex business operations.
 */

abstract class Service
{
    /**
     * Validate data based on rules
     */
    protected function validate(array $data, array $rules): array
    {
        $errors = [];

        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;

            if (is_array($rule)) {
                foreach ($rule as $singleRule) {
                    $error = $this->applyRule($field, $value, $singleRule);
                    if ($error) {
                        $errors[$field] = $error;
                        break;
                    }
                }
            } else {
                $error = $this->applyRule($field, $value, $rule);
                if ($error) {
                    $errors[$field] = $error;
                }
            }
        }

        return $errors;
    }

    /**
     * Apply single validation rule
     */
    private function applyRule(string $field, mixed $value, string $rule): ?string
    {
        $parts = explode(':', $rule);
        $ruleName = $parts[0];
        $parameter = $parts[1] ?? null;

        return match ($ruleName) {
            'required' => $this->validateRequired($value, $field),
            'email' => $this->validateEmail($value, $field),
            'min' => $this->validateMin($value, $field, (int) $parameter),
            'max' => $this->validateMax($value, $field, (int) $parameter),
            'numeric' => $this->validateNumeric($value, $field),
            'integer' => $this->validateInteger($value, $field),
            'string' => $this->validateString($value, $field),
            'in' => $this->validateIn($value, $field, explode(',', $parameter ?? '')),
            'date' => $this->validateDate($value, $field),
            'confirmed' => $this->validateConfirmed($value, $field),
            default => null
        };
    }

    /**
     * Validate required field
     */
    private function validateRequired(mixed $value, string $field): ?string
    {
        if ($value === null || $value === '') {
            return "The {$field} field is required";
        }
        return null;
    }

    /**
     * Validate email
     */
    private function validateEmail(mixed $value, string $field): ?string
    {
        if ($value !== null && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return "The {$field} must be a valid email address";
        }
        return null;
    }

    /**
     * Validate minimum length/value
     */
    private function validateMin(mixed $value, string $field, int $min): ?string
    {
        if (is_string($value) && strlen($value) < $min) {
            return "The {$field} must be at least {$min} characters";
        }
        if (is_numeric($value) && $value < $min) {
            return "The {$field} must be at least {$min}";
        }
        return null;
    }

    /**
     * Validate maximum length/value
     */
    private function validateMax(mixed $value, string $field, int $max): ?string
    {
        if (is_string($value) && strlen($value) > $max) {
            return "The {$field} must not exceed {$max} characters";
        }
        if (is_numeric($value) && $value > $max) {
            return "The {$field} must not exceed {$max}";
        }
        return null;
    }

    /**
     * Validate numeric
     */
    private function validateNumeric(mixed $value, string $field): ?string
    {
        if ($value !== null && !is_numeric($value)) {
            return "The {$field} must be numeric";
        }
        return null;
    }

    /**
     * Validate integer
     */
    private function validateInteger(mixed $value, string $field): ?string
    {
        if ($value !== null && !filter_var($value, FILTER_VALIDATE_INT)) {
            return "The {$field} must be an integer";
        }
        return null;
    }

    /**
     * Validate string
     */
    private function validateString(mixed $value, string $field): ?string
    {
        if ($value !== null && !is_string($value)) {
            return "The {$field} must be a string";
        }
        return null;
    }

    /**
     * Validate value in array
     */
    private function validateIn(mixed $value, string $field, array $allowed): ?string
    {
        if ($value !== null && !in_array($value, $allowed)) {
            return "The {$field} must be one of: " . implode(', ', $allowed);
        }
        return null;
    }

    /**
     * Validate date
     */
    private function validateDate(mixed $value, string $field): ?string
    {
        if ($value !== null && !strtotime($value)) {
            return "The {$field} must be a valid date";
        }
        return null;
    }

    /**
     * Validate confirmed field (e.g., password_confirmation)
     */
    private function validateConfirmed(mixed $value, string $field): ?string
    {
        global $requestData;
        $confirmationField = $field . '_confirmation';
        
        if (isset($requestData[$confirmationField]) && $value !== $requestData[$confirmationField]) {
            return "The {$field} confirmation does not match";
        }
        return null;
    }

    /**
     * Sanitize input data
     */
    protected function sanitize(array $data): array
    {
        $sanitized = [];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
            } elseif (is_array($value)) {
                $sanitized[$key] = $this->sanitize($value);
            } else {
                $sanitized[$key] = $value;
            }
        }
        return $sanitized;
    }

    /**
     * Hash password using Argon2id
     */
    protected function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
    }

    /**
     * Verify password
     */
    protected function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    /**
     * Generate random token
     */
    protected function generateToken(int $length = 32): string
    {
        return bin2hex(random_bytes($length));
    }

    /**
     * Generate UUID
     */
    protected function generateUuid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
