const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class PerformanceTester {
  constructor() {
    this.results = [];
    this.appProcess = null;
  }

  async runPerformanceTests() {
    console.log('🚀 Starting Gemini Quick Chat Performance Tests\n');

    try {
      await this.testStartupTime();
      await this.testMemoryUsage();
      await this.testCPUUsage();
      await this.testWindowTogglePerformance();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Performance test failed:', error);
    }
  }

  async testStartupTime() {
    console.log('⏱️  Testing startup time...');

    const startTime = Date.now();

    // Start the app
    this.appProcess = spawn('npm', ['start'], {
      cwd: process.cwd(),
      stdio: 'pipe',
    });

    // Wait for app to be ready (look for specific log message)
    return new Promise(resolve => {
      this.appProcess.stdout.on('data', data => {
        const output = data.toString();
        if (output.includes('ready') || output.includes('started')) {
          const endTime = Date.now();
          const startupTime = endTime - startTime;

          this.results.push({
            test: 'Startup Time',
            value: startupTime,
            unit: 'ms',
            status: startupTime < 3000 ? 'PASS' : 'FAIL',
            threshold: '< 3000ms',
          });

          console.log(
            `   Startup time: ${startupTime}ms ${startupTime < 3000 ? '✅' : '❌'}`
          );
          resolve();
        }
      });

      // Fallback timeout
      setTimeout(() => {
        this.results.push({
          test: 'Startup Time',
          value: 'TIMEOUT',
          unit: 'ms',
          status: 'FAIL',
          threshold: '< 3000ms',
        });
        resolve();
      }, 10000);
    });
  }

  async testMemoryUsage() {
    console.log('💾 Testing memory usage...');

    if (!this.appProcess) {
      console.log('   ⚠️  App not running, skipping memory test');
      return;
    }

    try {
      // Get memory usage using ps command
      const pid = this.appProcess.pid;
      const memOutput = execSync(`ps -o rss= -p ${pid}`).toString().trim();
      const memoryKB = parseInt(memOutput);
      const memoryMB = Math.round(memoryKB / 1024);

      this.results.push({
        test: 'Memory Usage',
        value: memoryMB,
        unit: 'MB',
        status: memoryMB < 200 ? 'PASS' : 'WARN',
        threshold: '< 200MB',
      });

      console.log(
        `   Memory usage: ${memoryMB}MB ${memoryMB < 200 ? '✅' : '⚠️'}`
      );
    } catch (error) {
      console.log('   ❌ Could not measure memory usage');
    }
  }

  async testCPUUsage() {
    console.log('🔥 Testing CPU usage...');

    // Simple CPU monitoring (platform dependent)
    // This is a basic implementation - could be enhanced with proper monitoring
    console.log(
      '   📊 CPU usage monitoring would require platform-specific tools'
    );

    this.results.push({
      test: 'CPU Usage',
      value: 'N/A',
      unit: '%',
      status: 'SKIP',
      threshold: '< 5% idle',
    });
  }

  async testWindowTogglePerformance() {
    console.log('🔄 Testing window toggle performance...');

    // This would require automation tools to test actual window toggling
    console.log('   📝 Window toggle performance requires manual testing');

    this.results.push({
      test: 'Window Toggle',
      value: 'Manual',
      unit: 'ms',
      status: 'MANUAL',
      threshold: '< 100ms',
    });
  }

  async generateReport() {
    console.log('\n📊 Performance Test Report');
    console.log('=' * 50);

    this.results.forEach(result => {
      const status =
        result.status === 'PASS'
          ? '✅'
          : result.status === 'WARN'
            ? '⚠️'
            : result.status === 'SKIP'
              ? '⏭️'
              : result.status === 'MANUAL'
                ? '📝'
                : '❌';

      console.log(
        `${status} ${result.test}: ${result.value}${result.unit} (${result.threshold})`
      );
    });

    // Save report to file
    const reportPath = path.join(__dirname, 'performance-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          results: this.results,
        },
        null,
        2
      )
    );

    console.log(`\n📄 Report saved to: ${reportPath}`);
  }

  cleanup() {
    if (this.appProcess) {
      this.appProcess.kill();
      console.log('\n🧹 Cleaned up test processes');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new PerformanceTester();

  // Handle cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n⏹️  Stopping performance tests...');
    tester.cleanup();
    process.exit(0);
  });

  tester.runPerformanceTests().then(() => {
    tester.cleanup();
    process.exit(0);
  });
}

module.exports = PerformanceTester;
