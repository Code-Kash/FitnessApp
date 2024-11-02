import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface SourceItem {
  title: string;
  references: number;
  isNew?: boolean;
}

const programFundamentals: SourceItem[] = [
  { title: 'Determining optimal volume', references: 4 },
  { title: 'Determining optimal frequency', references: 7, isNew: true },
];

const practicalDesign: SourceItem[] = [
  { title: 'Focus muscles', references: 5 },
  { title: 'Exercise selection', references: 2, isNew: true },
  { title: 'Exercise ordering and fatigue management', references: 2, isNew: true },
];

const Sources: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>SOURCES</Text>
        
        <Text style={styles.description}>
          Articles filled with peer-reviewed, published scientific research combined 
          with years of coaching experience. We've done the hard work for you, so 
          you can focus on getting the results.
        </Text>

        {/* Program Fundamentals Section */}
        <Text style={styles.sectionTitle}>PROGRAM FUNDAMENTALS</Text>
        {programFundamentals.map((item, index) => (
          <View key={index} style={styles.sourceItem}>
            <View style={styles.referenceTag}>
              <Text style={styles.referenceText}>{item.references} REFERENCES</Text>
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.isNew && <Text style={styles.newTag}>NEW</Text>}
          </View>
        ))}

        {/* Practical Program Design Section */}
        <Text style={styles.sectionTitle}>PRACTICAL PROGRAM DESIGN</Text>
        {practicalDesign.map((item, index) => (
          <View key={index} style={styles.sourceItem}>
            <View style={styles.referenceTag}>
              <Text style={styles.referenceText}>{item.references} REFERENCES</Text>
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.isNew && <Text style={styles.newTag}>NEW</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  sourceItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  referenceTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  referenceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
  },
  newTag: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  activeNavText: {
    color: '#007AFF',
  },
});

export default Sources;