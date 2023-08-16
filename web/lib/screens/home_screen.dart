import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        title: const Text('오늘은 뭐하지?'),
        actions: [
          TextButton(
            onPressed: () {
              // Handle sign in button press
            },
            child: const Text('Sign In'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('@dev_hyun'),
                  ElevatedButton(
                    onPressed: () {
                      // Handle subscribe button press
                    },
                    child: const Text('구독'),
                  ),
                ],
              ),
            ),
            Divider(
              color: Colors.grey.shade700,
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: Text('Hello, world!\n'),
            ),
            const Placeholder(),
            Divider(
              color: Colors.grey.shade700,
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('구독중'),
                  const SizedBox(height: 16),
                  const Text('홍길동 @khhandrea'),
                  Divider(
                    color: Colors.grey.shade700,
                  ),
                  const Text('@hello'),
                  Divider(
                    color: Colors.grey.shade700,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
