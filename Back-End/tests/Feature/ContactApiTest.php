<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_submit_contact_form()
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '0612345678',
            'message' => 'Hello, I would like to know more about your services.'
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(200) // your controller returns 200, not 201
                 ->assertJson([
                     'message' => 'Contact created successfully',
                     'contact' => [
                         'name' => 'John Doe',
                         'email' => 'john@example.com',
                         'phone' => '0612345678',
                         'message' => 'Hello, I would like to know more about your services.'
                     ]
                 ]);

        // ✅ Check that the contact is actually stored in DB
        $this->assertDatabaseHas('contacts', [
            'email' => 'john@example.com',
            'message' => 'Hello, I would like to know more about your services.'
        ]);
    }
}
