import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet, SafeAreaView, Platform } from 'react-native';

const App = () => {
  const scrollViewRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const images = [
    require('./assets/C.png'),
    require('./assets/cpp.png'),
    require('./assets/C1.png'),
    require('./assets/java.png'),
    require('./assets/Js.png'),
    require('./assets/python.jpg'),
  ];

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const timer = setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Tìm tất cả div trong container
      const allDivs = container.querySelectorAll('div');

      // Tìm div có thể scroll (scrollWidth > clientWidth)
      let scrollableDiv = null;
      allDivs.forEach(div => {
        if (div.scrollWidth > div.clientWidth) {
          scrollableDiv = div;
        }
      });

      if (scrollableDiv) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Xử lý kéo chuột (drag to scroll)
        const handleMouseDown = (e) => {
          isDown = true;
          scrollableDiv.style.cursor = 'grabbing';
          startX = e.pageX - scrollableDiv.offsetLeft;
          scrollLeft = scrollableDiv.scrollLeft;
        };

        const handleMouseLeave = () => {
          isDown = false;
          scrollableDiv.style.cursor = 'grab';
        };

        const handleMouseUp = () => {
          isDown = false;
          scrollableDiv.style.cursor = 'grab';
        };

        const handleMouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - scrollableDiv.offsetLeft;
          const walk = (x - startX) * 2;
          scrollableDiv.scrollLeft = scrollLeft - walk;
        };

        // Xử lý cuộn chuột (mouse wheel to scroll horizontally)
        const handleWheel = (e) => {
          e.preventDefault();
          scrollableDiv.scrollLeft += e.deltaY;
        };

        scrollableDiv.style.cursor = 'grab';
        scrollableDiv.style.userSelect = 'none';

        scrollableDiv.addEventListener('mousedown', handleMouseDown);
        scrollableDiv.addEventListener('mouseleave', handleMouseLeave);
        scrollableDiv.addEventListener('mouseup', handleMouseUp);
        scrollableDiv.addEventListener('mousemove', handleMouseMove);
        scrollableDiv.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
          scrollableDiv.removeEventListener('mousedown', handleMouseDown);
          scrollableDiv.removeEventListener('mouseleave', handleMouseLeave);
          scrollableDiv.removeEventListener('mouseup', handleMouseUp);
          scrollableDiv.removeEventListener('mousemove', handleMouseMove);
          scrollableDiv.removeEventListener('wheel', handleWheel);
        };
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Programming Languages</Text>

        <View ref={scrollContainerRef} style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <TextInput
          style={styles.input}
          placeholder="What is your favorite programming language from the list above?"
          placeholderTextColor="#666"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 30,
    paddingHorizontal: 20,
    textAlign: 'left',
    color: '#808080',
  },
  scrollContainer: {
    height: 280,
    marginBottom: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginRight: 20,
    backgroundColor: '#D2B48C',
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    marginHorizontal: 20,
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default App;